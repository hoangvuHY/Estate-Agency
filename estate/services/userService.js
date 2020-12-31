let UserModel = require('../models/user.model');

function getUserByIdService(id) {
  return UserModel.findOne({ _id: id });
}

let checkEmailService = (email) => {
  return UserModel.findOne({ email })
}

let updateUserService = (id,name,phone,address,username)=>{
  var modifyUser = {};
  if(name) modifyUser.name = name;
  if(phone) modifyUser.phone = phone;
  if(address) modifyUser.address = address;
  if(username) modifyUser.username = username;
  console.log( "modify: ",id, modifyUser);

  return UserModel.updateOne({ _id: id }, modifyUser);
}





module.exports = {
  getUserByIdService,
  checkEmailService,
  updateUserService
}