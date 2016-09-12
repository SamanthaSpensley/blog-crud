var express = require('express');
var router = express.Router();
var query = require('../db/query')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'blog.' });
});

//create new blog post
router.get('/new', function(req, res, next) {
  res.render('new');
});

//post new blog post
router.post('/', function(req, res, next) {
  query.getAllPosts().insert({
    title: req.body.title,
    content: req.body.content
  })
  .then(function() {
    res.redirect('/')
  })
})


module.exports = router;
