const crypto = require('crypto')                             //Importando a crypto para gerar uma string aleatória
const connection = require('../database/connection')         //importando a conexão com o banco de dados



module.exports = {
    
    /* Metodo de listar as ongs*/
    async index (request , response){
        const ongs  = await connection('ongs').select('*');
    
        return response.json(ongs);                         //Todas as ongs em formato Json
    },

    /* Método de criar um cadastro de Ong */
    async create(request, response){
    
        const {name, email, whatsapp, city, uf} = request.body;         //Pega do corpo da minha requisição

        const id = crypto.randomBytes(4).toString('HEX')                //Gerando uma String aleatoria de tamanho 4bytes em HEX

        await connection('ongs').insert({                   //Inserindo os dados no banco de dados
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id })                        //Vou obter como resposta o id da ong
    }
}