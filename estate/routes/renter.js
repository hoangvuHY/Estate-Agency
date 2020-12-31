var express = require("express");
var router = express.Router();
var { getAllPostRecentControler, getAllPostProvinceControler, getAllPostListController, getDetailPostController, searchAllPostController } = require("../controllers/renterController");
var { createReportController, createCommentController, allPostCommentsController } = require('../controllers/opinionController');
// Đây là các đường dẫn đến backend server
// lay tat ca ca bai dang theo chuoi tim kiem
router.post("/search", searchAllPostController);
// lấy tất cả các bài đăng
router.post("/all-post", getAllPostListController);
// lất tất cả các bài đăng hiện tại
router.get("/all-post-recent", getAllPostRecentControler);
//lấy số lượng bài đăng các tỉnh thành
router.get("/amount-post-province", getAllPostProvinceControler);
// lấy thông tin chi tiết bài đăng
router.get("/detailPost/:idPost", getDetailPostController);
//Report bài viết của chủ trọ
router.post('/report-renter', createReportController);
router.post('/comment-renter', createCommentController);
router.get('/all-post-comments/:idPost', allPostCommentsController)
module.exports = router;