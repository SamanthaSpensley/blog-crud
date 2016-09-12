
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', (table) => {
    table.increments();
    table.text('content');
    table.integer('author_id').references('id').inTable('user');
    table.integer('post_id').references('id').inTable('post');
    table.timestamps(null,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comment')
};
