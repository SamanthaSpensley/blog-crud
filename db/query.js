var knex = require('./knex')

function Posts() {
  return knex('post');
}

function Users() {
  return knex('user')
}

function Comments() {
  return knex('comment')
}

module.exports = {
  getAllPosts: Posts,
  getAllUsers: Users,
  getAllComments: Comments
};
