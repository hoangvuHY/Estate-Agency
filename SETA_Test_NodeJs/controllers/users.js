const bcrypt = require('bcrypt');
const {
  caseSuccess,
  caseErrorClient,
  caseErrorServer,
  Sign
} = require('../utils/results');

const {
  createUserService
} = require("../services/users");
const saltRounds = 10;

const registerController = async (req, res) => {
  try {
    // Get the information submitted by the user
    var userObject = req.body;
    const salt = await bcrypt.genSalt(saltRounds);
    userObject.password = await bcrypt.hash(userObject.password, salt);
    const user = await createUserService(userObject);
    if (user) {
      caseSuccess(res, "Bạn đã đăng ký thành công");
    } else {
      caseErrorClient(res, "Bạn đăng ký thất bại")
    }
  } catch (error) {
    caseErrorServer(res, error);
  }
}
const loginController = async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      user.password = undefined;
      const token = Sign({user}, "1d");
      res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 60 * 24 });
      caseSuccess(res, "Bạn đã đăng nhập thành công", token);
    }else{
      caseErrorClient(res,"Bạn đã đăng nhập thất bại");
    }
  } catch (error) {
    caseErrorServer(res, error);
  }
}

module.exports = {
  registerController,
  loginController
}