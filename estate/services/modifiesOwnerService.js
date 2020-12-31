let ModifyOwnerModel = require('../models/modify.model');
let infoUserModifyService = (idOwner, infoUser) => {
  let {
    address,
    phone,
    name,
    username,
    status
  } = infoUser;
  return ModifyOwnerModel.create({
    address,
    phone,
    name,
    username,
    status,
    idOwner
  })
}
let getOwnerService = () => {
  return ModifyOwnerModel.find({});
}
let updateStatusService = (id, status) => {
  return ModifyOwnerModel.updateOne({ _id: id }, { status: status });
}
let deleteOwnerService = (id) => {
  return ModifyOwnerModel.deleteOne({ _id: id });
}
let checkIdOwnerService = (id) => {
  return ModifyOwnerModel.findOne({ idOwner: id });
}
module.exports = {
  infoUserModifyService,
  getOwnerService,
  updateStatusService,
  deleteOwnerService,
  checkIdOwnerService
}