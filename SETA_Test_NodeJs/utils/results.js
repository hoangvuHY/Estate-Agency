var jwt = require('jsonwebtoken');
// Mã hóa id của người dùng
const Sign = (infoSecure, expires) => {
  return jwt.sign(infoSecure, process.env.JWT_SECRET, { expiresIn: expires, algorithm: "HS512" })
}
// Giải hóa id của người dùng
const Verify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}
// Trả về nếu thành công
const caseSuccess = (res, message, data) => {
  return res.json({
    error: false,
    status: 200,
    message: message,
    data: data
  })
}
// Trả về nếu thất bại
const caseErrorClient = (res, message) => {
  return res.json({
    error: true,
    status: 400,
    message: message,
  })
}
// Trả về nếu thất bại do server
const caseErrorServer = (res, error) => {
  console.log(error)
  return res.json({
    error: true,
    status: 500,
    message: error
  })
}

module.exports = {
  caseSuccess,
  caseErrorClient,
  caseErrorServer,
  Sign,
  Verify
}
