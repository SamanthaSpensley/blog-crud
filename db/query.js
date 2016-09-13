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

function CreateComment(content, author_id, post_id) {
  return knex('comment').insert({content:content, author_id:author_id, post_id:post_id})
}

function GetComments(post_id) {
  return knex('comment').select('comment.id', 'comment.content', 'comment.author_id', 'comment.post_id').where('comment.post_id', post_id)
}


function deleteComments(blog_id){
  return knex('comment').where('blog_id',blog_id).del();
}



module.exports = {
  getAllPosts: Posts,
  getAllUsers: Users,
  getAllComments: Comments,
  createComment: CreateComment,
  getComments: GetComments
};
