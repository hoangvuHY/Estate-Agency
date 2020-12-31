var express = require('express');
var router = express.Router();
let { checkAuth, checkOwner, checkAdmin, checkOwner_Admin, checkAuthFavorite } = require('../middleware/index');
let { checkAuthController } = require('../controllers/authController')


router.get('/login', function (req, res, next) {
  res.render('login_register/login');
});
router.get('/register', function (req, res, next) {
  res.render('login_register/register');
});

// Đây là router đến giao diện cline của renter, và các đường link trong router chính là các đường link sẽ hiện lên thanh url của người dùng

router.get(`/list/loai_nha_tro/:loai_nha_tro/tinh/:tinh/huyen/:huyen/xa/:xa/duong/:duong/an_ninh/:an_ninh/dien_tich_min/:dien_tich_min/dien_tich_max/:dien_tich_max/muc_gia_min/:muc_gia_min/muc_gia_max/:muc_gia_max/ban_cong/:ban_cong/dieu_hoa/:dieu_hoa/binh_nong_lanh/:binh_nong_lanh/tu_lanh/:tu_lanh/may_giat/:may_giat`, function (req, res, next) {
  res.render('renter/search');
});

router.get('/list', function (req, res, next) {
  res.render('renter/list');

});

router.get('/detail/:idPost', function (req, res, next) {
  res.render('renter/detail');
});


router.get('/favorite', checkAuthFavorite, function (req, res, next) {
  res.render('renter/favorite');
});

router.get('/', checkAuth, checkAuthController); // giao dien trang chu
// Kết thúc router đến giao diện cline của renter 

router.get('/profile-owner', checkAuth, function (req, res, next) {
  res.render('owners/profile-owner', { title: 'Profile' });
});
router.get('/profile', checkAuth, function (req, res, next) {
  res.render('profile', { title: 'Profile' });
});

router.get('/modify', checkAuth, checkOwner, function (req, res, next) {
  res.render('owners/modifyOwner', { title: 'Modify' });
});
/* GET waiting-approve page. */
router.get('/waiting-for-approval', checkAuth, checkOwner, function (req, res, next) {
  res.render('owners/wait-approve-info', { title: 'Waiting Approve' });
});

router.get('/chat-room', checkAuth, checkOwner_Admin, function (req, res,) {
  res.render('owners/chat-room', { title: 'Table List' });
})
router.get('/credits', checkAuth, checkAdmin, function (req, res, next) {
  res.render('admin/credits', { title: 'Express' });
});
router.get('/datatables', checkAuth, checkAdmin, function (req, res, next) {
  res.render('admin/datatables', { title: 'Express' });
});
router.get('/mail-box', checkAuth, checkAdmin, function (req, res, next) {
  res.render('admin/mail-box', { title: 'Express' });
});
router.get('/request-owners', checkAuth, checkAdmin, function (req, res, next) {
  res.render('admin/request-modify-owner', { title: 'Express' });
});
//Báo cáo của người dùng
router.get('/report-render', checkAuth, checkAdmin, function (req, res, next) {
  res.render('admin/report-render', { title: 'Express' });
});
//comment của người dùng
router.get('/comment-render', checkAuth, checkAdmin, function (req, res, next) {
  res.render('admin/comment-render', { title: 'Express' });
});
router.get('/admin-chat-room', checkAuth, checkAdmin, function (req, res, next) {
  res.render('admin/credits-copy', { title: 'Express' });
});
module.exports = router;
