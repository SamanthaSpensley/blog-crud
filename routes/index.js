var express = require('express');
var router = express.Router();
var query = require('../db/query')

/* GET home page. */
router.get('/', function(req, res, next) {
  query.getAllPosts().select()
  .then(function(results) {
    res.render('index', {
      title: 'blog.',
      post: results
    });
  })
});

//create new blog post
router.get('/new', function(req, res, next) {
  res.render('new');
});


//GET single post page
router.get('/:id', function(req, res, next) {
  query.getAllPosts().where({id: req.params.id}).first()
  .then(function(results) {
    query.getComments(req.params.id)
    .then(function(comments) {
      res.render('display', {
        post: results,
        comments: comments
      });
    })
  })
  // query.getCommentsPerPost()
})

//EDIT single blog post
router.get('/:id/edit', function(req, res, next) {
  query.getAllPosts().where({id: req.params.id}).first()
  .then(function(results) {
    res.render('edit', {
      post: results
    })
  })
})

//EDIT existing blog post using post
router.post('/:id/edit', function(req, res, next) {
  query.getAllPosts().where({id: req.params.id}).update({
    title: req.body.title,
    content: req.body.content
  })
  .then(function() {
    res.redirect(`/${req.params.id}`);
  })
})

//POST new blog post
router.post('/', function(req, res, next) {
  query.getAllPosts().insert({
    title: req.body.title,
    content: req.body.content
  })
  .then(function() {
    res.redirect('/')
  })
})

//DELETE single blog post
router.post('/:id/delete', function(req, res, next) {
  query.getAllPosts().where({id: req.params.id}).del()
  .then(function() {
    res.redirect('/')
  })
})


//COMMENTS!!
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


module.exports = router;
