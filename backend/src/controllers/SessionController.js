const connection = require('../database/connection');

module.exports = {

    /* Método de criar uma secção que retorna o nome da ong */
    async create(request, response){
        const {id} = request.body;                                      //Buscando o id da ong do corpo da requisição

        const ong = await connection('ongs').where('id',id).select('name').first();         //Pegando do banco de dados o nome da ong com o id da requisição

        if(!ong){          
            return response.status(400).json({ error: 'No Ong found with this ID'});

        }
        return response.json(ong);          //Retornando o nome da ong
    }
}