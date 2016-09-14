
exports.up = function(knex, Promise) {
  return knex.schema.table('post', (table) => {
    table.text('snippet')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropColumn('snippet');
};
