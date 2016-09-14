var knex = require('./knex')

// POSTS
function Posts() {
  return knex('post').select().orderBy('id', 'desc');
}

function GetPostById(post_id) {
  return knex('post').select().where('id', post_id)
}

function CreatePost(title, content, author_id, snippet) {
  return knex('post').insert({
    title: title,
    content: content,
    author_id: author_id,
    snippet: content.substring(0,400)+'...'
  })
}

function EditPost(post_id, title, content, snippet) {
  return knex('post').update({
    title: title,
    content: content,
    // snippet: content.substring(0,400)+'...'
  }).where('id', post_id)
}

function DeletePost(post_id) {
  return knex('post').where('id', post_id).del();
}

//USERS
function Users() {
  return knex('user')
}


//COMMENTS
function Comments() {
  return knex('comment')
}

function GetComments(post_id) {
  return knex('comment').select('comment.id', 'comment.content', 'comment.author_id', 'comment.post_id').where('comment.post_id', post_id)
}

function GetCommentById(comment_id) {
  return knex('comment').select('id', 'content', 'post_id', 'author_id').where('id', comment_id)
}

function CreateComment(content, author_id, post_id) {
  return knex('comment').insert({
    content: content,
    author_id: author_id,
    post_id: post_id
  })
}

function DeleteComments(post_id) {
  return knex('comment').where('post_id', post_id).del()
}

function DeleteComment(comment_id){
  return knex('comment').where('id', comment_id).del();
}


module.exports = {
  getAllPosts: Posts,
  getPostbyId: GetPostById,
  createPost: CreatePost,
  editPost: EditPost,
  deletePost: DeletePost,
  getAllUsers: Users,
  getAllComments: Comments,
  // createComment: CreateComment,
  getComments: GetComments,
  createComment: CreateComment,
  deleteComments: DeleteComments,
  deleteComment: DeleteComment,
};
