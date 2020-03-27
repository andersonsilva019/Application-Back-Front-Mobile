const connection = require('../database/connection');                       //Importando a conexão com o banco de dados

module.exports = {

    /* Metodo de listar os casos de uma ong especifica */
    async index(resquest, response){

        const {page = 1} = resquest.query;

        const [count] = await connection('incidents').count();              //Contando a quantidade de casos de uma ong

        response.header('X-Total-Count',count['count(*)'])                  //Retornando para o usuário o qtd de casos atraves do cabeçalho da resposta
        
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

        return response.json(incidents);                                    //Retornando os casos 
    },

    /* Método para criar um caso */
    async create(resquest, response){

        const {title, description, value} = resquest.body;                  //Pegando as informação do corpo da requisição
        const ong_id = resquest.headers.authorization;                      //Buscando o id da ong atraves do authorizations

        const [id] = await connection('incidents').insert({                 //Inserindo no banco de dados na tabela 'incidents'
            title,      
            description,
            value,
            ong_id,
        })

        return response.json({ id })                                        //Retornando para o usuario o id do caso
    },

    
    /* Método para deletar um caso */
    async delete(resquest, response){

        const {id} = resquest.params;                                       //Pegando o id do caso da requisição
        const ong_id = resquest.headers.authorization;                      //Pegando o id da ong do cabeçalho da requisição

        const incidents = await connection('incidents').where('id',id).select('ong_id').first()

        if(incidents.ong_id != ong_id){                                     //
            return response.status(401).json({ error: 'Operation not permitted.' })
        }

        /* Deletando do banco */
        await connection('incidents').where('id',id).delete();

        return response.status(204).send();                                 //Deu certo a operação de deletar

    }
}