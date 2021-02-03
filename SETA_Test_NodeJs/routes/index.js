var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});
/* GET home. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});


module.exports = router;
