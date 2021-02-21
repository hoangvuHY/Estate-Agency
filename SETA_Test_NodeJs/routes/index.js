var express = require('express');
var router = express.Router();
const {
  checkTokenMiddleware
} = require("../middleware/auth")

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login-register/login', { title: 'Express' });
});
/* GET register page. */
router.get('/register', function (req, res, next) {
  res.render('login-register/register', { title: 'Express' });
});
/* GET home. */
router.get('/', checkTokenMiddleware, function (req, res, next) {
  res.render('user-home/home', { title: 'Express' });
});

module.exports = router;
