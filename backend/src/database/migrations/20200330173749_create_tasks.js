exports.up = function(knex) {
  return knex.schema.createTable('tasks', function(table){
    table.increments('id').primary();
    table.string('description').notNullable();
    table.boolean('completed').defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};
