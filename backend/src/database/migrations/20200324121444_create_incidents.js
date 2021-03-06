
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table){
        /* Campos da tabela */
        table.increments()
        table.string('title').notNullable()
        table.string('description').notNullable()
        table.decimal('value')
        /* Relacionamento */
        table.string('ong_id').notNullable()                            //id da ong
        /* A coluna 'ong_id' referencia o id da tabela ongs */
        table.foreign('ong_id').references('id').inTable('ongs')        
  })
};

exports.down = function(knex) { //Caso der algum erro, apague a tabela
    return knex.shema.dropTable('incidents')
};
