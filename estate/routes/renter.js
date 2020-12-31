var express = require("express");
var router = express.Router();
var { createReportController, createCommentController, allPostCommentsController } = require('../controllers/opinionController');
// Đây là các đường dẫn đến backend server 
var { findPostProvinceController, addSeenPostController, saveFavoritePostController, getAllPostRecentControler, getAllPostProvinceControler, getAllPostListController, getDetailPostController, searchAllPostController, getFavoritePostController } = require("../controllers/renterController");

// Đây là các đường dẫn đến backend server

router.post('/all-post-province', findPostProvinceController);

router.post('/seen-post', addSeenPostController);

router.post("/get-favorite-post", getFavoritePostController);

router.post("/save-favorite-post", saveFavoritePostController);


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