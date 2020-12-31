var express = require('express');
var router = express.Router();
let {
  checkOwner,
  checkAuth,
  checkOwner_Admin,
  checkAdmin
} = require('../middleware/index');
let {
  uploadImageLocalController,
  createPostController,
  postsOwnerController,
  detailPostController,
  updatePostController,
  deletePostController,
  getAllPostsController
} = require('../controllers/ownerController')
let upload = require('../controllers/multerController');
/* GET owners listing. */
router.use(checkAuth); 
// render post room
router.get('/poster-room',checkOwner, (req, res, next) => {
  res.render('owners/posterRoom');
});
//Delete post
router.delete('/delete-post-room/:idPost',checkOwner, deletePostController); 
/* Get all posts owners input local. */
router.get('/owner-posts',checkOwner, postsOwnerController);

router.use(checkOwner_Admin);
//Put post
router.put('/update-post-room/:idPost', updatePostController);
/* Post room owners input local. */
router.post('/post-room', createPostController);
//Get detail post
router.get('/detail-post/:idPost', detailPostController);
/* Post images owners input local. */
router.post('/upload-image', upload.any(), uploadImageLocalController);

//Get all post room
router.get('/all-posts-rent', checkAdmin, getAllPostsController);

module.exports = router;
