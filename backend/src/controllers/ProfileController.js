const connection = require('../database/connection');                   //Importando a conexão com o banco de dados
    
module.exports = {

    async index(request, response){

        const ong_id = request.headers.authorization;                   //Pegando o id da ong do cabeçalho da requisição

        const incidents = await connection('incidents').where('ong_id',ong_id).select('*');     //Pegando todos os casos com o id da ong

        return response.json(incidents);                                //Enviando para o usuário a lista com os casos da respectiva ong
    }
}

