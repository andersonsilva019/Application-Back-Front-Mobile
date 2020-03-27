const knex = require('knex'); /* Para instalar -> npm install knex */

const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection;                                //Exportando a conexão do banco de dados