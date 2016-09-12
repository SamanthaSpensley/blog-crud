
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post', (table) => {
    table.increments();
    table.string('title');
    table.text('content');
    table.integer('author_id').references ('id').inTable('user');
    table.timestamps(null,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('post');
};
