var express = require('express');
var router = express.Router();
var {
  signUpController,
  loginController 
} = require('../controllers/authController');
var {
  isEmailMiddleware,
   checkLoginMiddleware
} = require('../middleware/index')


router.post('/sign-up', isEmailMiddleware, signUpController)
router.post('/login', checkLoginMiddleware, loginController)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
