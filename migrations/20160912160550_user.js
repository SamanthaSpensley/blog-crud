
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', (table) => {
    table.increments();
    table.string('username');
    table.string('password');
    table.boolean('admin');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
