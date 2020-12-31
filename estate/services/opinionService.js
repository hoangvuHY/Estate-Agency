let UserModel = require('../models/user.model');
let PostRoom = require('../models/post_room.model');
let Opinion = require('../models/opinion_renter.model');

// Tạo ra báo cáo của người thuê  
let createReportService = (infoOpinion) => {
  return Opinion.create(infoOpinion);
}
//Tìm kiếm bài viết của người viết và id của bài viết để xem đã bình luận chưa
let checkCommentService = (idRenter, idPost) => {
  return Opinion.findOne({ idRenter: idRenter, idPost: idPost })
}

// Lấy tất cả báo của của người thuê
let allReportsService = () => {
  return Opinion.find({ typeOpinion: 'report' }).populate('idRenter');
}
// Lấy tất cả comment của của người thuê
let allCommentsService = () => {
  return Opinion.find({ typeOpinion: 'comment' }).populate('idRenter');
}
//Chấp nhận bình luận của người thuê
let acceptCommentService = (idComment) => {
  return Opinion.updateOne({ _id: idComment }, { status: 'active' })
}
//Hủy bình luận của người thuê
let cancelCommentService = (idComment) => {
  return Opinion.deleteOne({ _id: idComment })
}
//Lấy những bình luận của người bài viết đó
let allPostCommentsService = (idPost) => {
  return Opinion.find({ idPost, typeOpinion: 'comment', status: 'active' }).populate('idRenter');
}
module.exports = {
  createReportService,
  allReportsService,
  checkCommentService,
  allCommentsService,
  acceptCommentService,
  cancelCommentService,
  allPostCommentsService

}