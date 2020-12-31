let { createReportService, allReportsService, checkCommentService, allCommentsService,
  acceptCommentService, cancelCommentService, allPostCommentsService


} = require('../services/opinionService');
var { caseSuccess, caseErrorUser, caseErrorServer } = require('../utils/returnValue');
var { Verify } = require('../utils/JWT');
// Tạo ra báo cáo của người thuê
let createReportController = async (req, res) => {
  try {
    var infoReport = await createReportService(req.body);
    if (infoReport) {
      caseSuccess(res, "Bạn đã báo cáo lên admin");
    } else {
      caseErrorUser(res, "Báo cáo của bạn đã bị lỗi")
    }
  } catch (error) {
    caseErrorServer(res, "Lỗi từ bên server");
  }
}
//Comment của người thuê
let createCommentController = async (req, res) => {
  try {

    var token = req.cookies.token || req.body.token;
    var data = Verify(token, process.env.JWT_SECRET);
    var idRenter = data._id;
    var object = {
      voteStar: req.body.voteStar, content: req.body.content, idPost: req.body.idPost, idRenter
    }
    var checkComment = await checkCommentService(idRenter, object.idPost);
    console.log(checkComment);
    // Kiểm tra chưa có comment trong bài viết đó
    if (!checkComment) {
      const infoComment = await createReportService(object);
      if (infoComment) {
        caseSuccess(res, "Bạn đã bình luận thành công bài viết");
      }
    } else {
      caseErrorUser(res, "Comment của bạn đã tồn tại rồi")
    }
  } catch (error) {
    caseErrorServer(res, "Error Server");
  }
}
// Tất cả báo cáo của người thuê
let allReportsController = async (req, res) => {
  try {
    var allReports = await allReportsService();
    console.log(allReports);
    if (allReports) {
      res.json({
        status: 200,
        error: false,
        message: "Tất cả báo cáo của người thuê",
        allReports: allReports
      })
    } else {
      caseErrorUser(res, "Báo cáo của người thuê đã bị lỗi")
    }
  } catch (error) {
    caseErrorServer(res, "Lỗi từ bên server");
  }
}
// Tất cả comment của người thuê
let allCommentsController = async (req, res) => {
  try {
    var allComments = await allCommentsService();
    if (allComments) {
      res.json({
        status: 200,
        error: false,
        message: "Tất cả comment của người thuê",
        allComments: allComments
      })
    } else {
      caseErrorUser(res, "Comment của người thuê đã bị lỗi")
    }
  } catch (error) {
    caseErrorServer(res, "Lỗi từ bên server");
  }
}

//Chấp nhận bình luận của người thuê 
let acceptCommentController = async (req, res) => {
  try {
    var acceptComment = await acceptCommentService(req.params.idComment);
    if (acceptComment) {
      caseSuccess(res, "Bạn đã chấp nhận bình luận của người thuê")
    } else {
      caseErrorUser(res, "Lỗi chấp nhận bình luận")
    }
  } catch (error) {
    caseErrorServer(res, "Bạn đã chấp nhận bình luận của người thuê")
  }
}
//Hủy bình luận của người thuê

let cancelCommentController = async (req, res) => {
  try {
    var cancelComment = await cancelCommentService(req.params.idComment);
    if (cancelComment) {
      caseSuccess(res, "Bạn đã chấp nhận bình luận của người thuê")
    } else {
      caseErrorUser(res, "Lỗi chấp nhận bình luận")
    }
  } catch (error) {
    caseErrorServer(res, "Bạn đã chấp nhận bình luận của người thuê")
  }
}
let allPostCommentsController = async (req, res) => {
  try {
    var allPostComment = await allPostCommentsService(req.params.idPost);
    if (allPostComment) {
      return res.json({
        status: 200,
        error: false,
        allPostComment: allPostComment
      })
    }else{
      caseErrorUser(res, "Tất cả bình luận của bài viết đã bị lỗi")
    }
  } catch (error) {
    caseErrorServer(res, "Bạn đã chấp nhận bình luận của người thuê");
  }
}
module.exports = {
  createReportController,
  allReportsController,
  createCommentController,
  allCommentsController,
  acceptCommentController,
  cancelCommentController,
  allPostCommentsController
}