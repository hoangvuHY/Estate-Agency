const {
  checkEmailService,
} = require("../services/users");
const {
  caseErrorClient,
  caseErrorServer,
  Verify
} = require('../utils/results');
const bcrypt = require('bcrypt');


const checkEmailRegisterMiddleware = async (req, res, next) => {
  try {
    const { email } = req.body;
    const checkEmail = await checkEmailService(email);
    if (!checkEmail) {
      next();
    } else {
      caseErrorClient(res, "Email của bạn đã tồn tại");
    }
  } catch (error) {
    caseErrorServer(res, error)
  }
}

const checkEmailLoginMiddleware = async (req, res, next) => {
  try {
    const { email } = req.body;
    const checkEmail = await checkEmailService(email);
    if (checkEmail) {
      req.user = checkEmail;
      next();
    } else {
      caseErrorClient(res, "Tài khoản email của bạn không tồn tại");
    }
  } catch (error) {
    caseErrorServer(res, error);
  }
}
const checkPasswordMiddleware = async (req, res, next) => {
  try {
    const { password } = req.body;
    const checkPassword = await bcrypt.compare(password, req.user.password);
    if (checkPassword) {
      next();
    } else {
      caseErrorClient(res, "Password của bạn không chính xác");
    }
  } catch (error) {
    caseErrorServer(res, error);
  }
}
const checkTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.body.token  || req.cookies.token;// || req.header("Cookie").split("=")[1]
    const dataUser = Verify(token);

    if (dataUser) {
      req.user = dataUser.user;
      next();
    } else {
      res.redirect('/login')
    }
  } catch (error) {
    res.redirect('/login')
  }
}

module.exports = {
  checkEmailRegisterMiddleware,
  checkPasswordMiddleware,
  checkEmailLoginMiddleware,
  checkTokenMiddleware
}