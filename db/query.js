var bcrypt = require('bcrypt');
var knex = require('./knex.js');

//USERS
function Users() {
  return knex('user')
}

function HashPassword(password) {
  return bcrypt.hashSync(password, 10)
}

function GetUser(username) {
  return knex('user').select('user.username').where('username', username).first();
}

function GetHashedPassword(username) {
  return knex('user').select('user.password').where('username', username).first();
}

function AuthenticateUser(username, password) {
  return GetUser(username)
  .then(function(userInfo){
    if(!userInfo) {
      return false
    }
    return GetHashedPassword(username)
    .then(function(hashedPassword) {
      hashedPassword = hashedPassword.password;
      return bcrypt.compareSync(password, hashedPassword)
    });
  });
}

function AddUser(username, password) {
  if(!username || !password) {
    return false
  }
  return GetUser(username)
  .then(function(userInfo) {
    if(userInfo) {
      return false
    }
    return knex('user').insert({
      username: username,
      password: HashPassword(password),
      admin: false})
  })
  .catch(function(err) {
    return err;
  });
}



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

function GetUsername(username) {
  return knex('user').select('id', 'username').where('username', username).first();
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
  getAllUsers: Users,
  hashPassword: HashPassword,
  getHashedPassword: GetHashedPassword,
  getUser: GetUser,
  authenticate: AuthenticateUser,
  addUser: AddUser,

  getAllPosts: Posts,
  getPostbyId: GetPostById,
  createPost: CreatePost,
  getUsername: GetUsername,
  editPost: EditPost,
  deletePost: DeletePost,

  getAllComments: Comments,
  // createComment: CreateComment,
  getComments: GetComments,
  createComment: CreateComment,
  deleteComments: DeleteComments,
  deleteComment: DeleteComment,
};
