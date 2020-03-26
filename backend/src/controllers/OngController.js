const crypto = require('crypto')
const connection = require('../database/connection')         //importando a conexão com o banco de dados

module.exports = {
    
    /* Metodo de listar */
    async index (request , response){
        const ongs  = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    /* Método de criar um cadastro de Ong */
    async create(request, response){
    
        const {name, email, whatsapp, city, uf} = request.body;

        const id = crypto.randomBytes(4).toString('HEX')                //Gerando uma String aleatoria de tamanho 4bytes 

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id })
    }
}