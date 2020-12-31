// Login, register
let {
  signUpService,
} = require('../services/authServices')
var bcrypt = require('bcrypt');
var { Sign } = require('../utils/JWT')
var { caseSuccess, caseErrorUser, caseErrorServer } = require('../utils/returnValue');


let signUpController = async (req, res) => {
  try {
    // let user = await signUpService(req.body); 
    console.log("signUpController: ",);
    await signUpService(req.body);
    caseSuccess(res, "Đăng ký thành công");
  } catch (error) {
    if (error) {
      caseErrorUser(res, "Đăng ký không thành công");
    }
  }
}

let loginController = (req, res) => {
  bcrypt.compare(req.body.password, req.user.password, function (err, results) {

    if (err) {
      caseErrorServer(res, "Lỗi server");
    }
    if (!results) {
      caseErrorUser(res, "Sai password");
    } else {

      // mã hóa id người dùng vào cookie và lưu vào cookie
      var token = Sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 * 1 })
      req.user["password"] = undefined;
      return res.status(200).json({
        error: false,
        status: 200,
        message: "Bạn đã đăng nhập thành công",
        data: {
          user: req.user
        }
      });
    }
  })

}

let checkAuthController = (req, res) => {
  var user = req.userLocal
  if (user) {
    if (user.role === "admin") {
      return res.render("admin/dashboard_v1");
    }
    if (user.role === "owner") {
      return res.render("owners/homeOwner");
    }
    if (user.role === "user") {
      return res.render("renter/home");
    }
  }
  return res.render("renter/home");
}

module.exports = {
  signUpController,
  loginController,
  checkAuthController
}