var express = require('express');
var router = express.Router();
var passport = require('../passport')
var query = require('../db/query')

// Users
//logout
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

//Register
router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
  query.addUser(req.body.username, req.body.password)
  .then(function() {
    res.redirect('/login')
  })
  .catch(function(err) {
    res.render('register', {errMessage: "Username already in use, please select a different username"})
  })
})

//Login
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
})
);


//Posts
/* GET home page. */
router.get('/', function(req, res, next) {
  query.getAllPosts()
  .then(function(results) {
    res.render('index', {
      title: 'blog.',
      post: results
    });
  })
});

//Create New Blog Post
router.get('/new', function(req, res, next) {
  res.render('new');
});


router.post('/', function(req, res, next) {
  query.createPost(req.body.title, req.body.content)
  .then(function() {
    res.redirect('/')
  })
})

//Get a Single Post With Comments
router.get('/:id', function(req, res, next) {
  query.getAllPosts().where({id: req.params.id}).first()
  .then(function(results) {
    query.getComments(req.params.id)
    .then(function(comments) {
      res.render('display', {
        post: results,
        comment: comments
      });
    })
  })
})

//Edit an Existing Post
router.get('/:id/edit', function(req, res, next) {
  query.getPostbyId(req.params.id).first()
  .then(function(results) {
    res.render('edit', {
      post: results
    })
  })
})

router.post('/:id/edit', function(req, res, next) {
  query.editPost(req.params.id).first()
  .then(function() {
    res.redirect(`/${req.params.id}`);
  })
})

//Delete an Existing Post
router.post('/:id/delete', function(req, res, next) {
  query.deleteComments(req.params.id)
  .then(function() {
    query.deletePost(req.params.id)
    .then(function() {
      res.redirect('/')
    })
  })
})

//Create Comment
router.post('/:id', function(req, res, next) {
  query.getAllComments().insert({
    content: req.body.content,
    // author_id: 1,
    post_id: req.params.id
  })
  .then(function() {
    res.redirect(`/${req.params.id}`)
  })
})

//Delete Single Comment
router.post('/comment/:id/delete', function(req, res, next) {
  query.deleteComment(req.params.id)
  .then(function() {
    res.redirect('/')
  })
})

module.exports = router;
