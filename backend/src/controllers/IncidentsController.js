const connection = require('../database/connection');

module.exports = {

    async index(resquest, response){

        const {page = 1} = resquest.query;

        const [count] = await connection('incidents').count();

        response.header('X-Total-Count',count['count(*)'])
        
        const incidents  = await connection('incidents')
        .join('ongs', 'ongs.id' , '=' , 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'incidents.* ', 
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city',
            'ongs.uf']);       

        return response.json(incidents);
    },

    async create(resquest, response){
        const {title, description, value} = resquest.body;
        const ong_id = resquest.headers.authorization;                      //Buscando o id da ong atraves do authorizations

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id })
    },

    async delete(resquest, response){
        const {id} = resquest.params;
        const ong_id = resquest.headers.authorization;

        const incidents = await connection('incidents').where('id',id).select('ong_id').first()

        if(incidents.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permitted.' })
        }

        /* Deletando do banco */
        await connection('incidents').where('id',id).delete();

        return response.status(204).send();

    }
}