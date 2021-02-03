var express = require('express');
var router = express.Router();
const {
  checkEmailRegisterMiddleware,
  checkEmailLoginMiddleware,
  checkPasswordMiddleware
} = require('../middleware/auth');
const {
  registerController,
  loginController
} = require('../controllers/users');

/* Post users register. */
router.post("/register", checkEmailRegisterMiddleware, registerController);
/* Post users login. */
router.post("/login", checkEmailLoginMiddleware, checkPasswordMiddleware, loginController);

module.exports = router;
