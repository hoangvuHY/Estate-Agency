const Users = require('../model/users');

const createUserService = (user) => {
  return Users.create(user);
}
const checkEmailService = (email) => {
  return Users.findOne({ email })
}


module.exports = {
  createUserService,
  checkEmailService
}