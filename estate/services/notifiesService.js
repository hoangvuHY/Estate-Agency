let PostRoom = require('../models/post_room.model');
let User = require('../models/user.model');
let Notify = require('../models/notifies.model');
let createNotifyService = (infoNotify) => {
  return Notify.create(infoNotify)
}
let allNotifyOwnerService = (idOwner) => {
  return Notify.find({ idOwner: idOwner }).populate("idPost");
}
let allNotifyHiredService = () => {
  return Notify.find({ content: "đã được thuê" }).populate("idOwner");
}
let deleteNotifyOwnerService = (idNotify) => {
  return Notify.deleteOne({ _id: idNotify })
  // return Notify.deleteOne({_id: idNotify})
}
module.exports = {
  createNotifyService,
  deleteNotifyOwnerService,
  allNotifyOwnerService,
  allNotifyHiredService
}