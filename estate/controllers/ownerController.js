var {
  createPostRoomService,
  postsOwnerService,
  allPostsService,
  updatePostService,
  findPostService,
  deletePostService
} = require('../services/posterRoomService');

var { caseSuccess, caseErrorUser, caseErrorServer } = require('../utils/returnValue');
var { Verify } = require('../utils/JWT');
const images = new Array();
let uploadImageLocalController = async (req, res) => {
  images.push(req.files[0].path);
  res.send(req.files);
}

let createPostController = async (req, res) => {
  try {
    var token = req.cookies.token || req.body.token;
    var dataUser = Verify(token, process.env.JWT_SECRET);
    var idOwner = dataUser._id;
    var object = req.body;
    object.images_room = images;
    object.idOwner = idOwner;
    var post_room = await createPostRoomService(object);
    console.log(post_room);
    images.length = 0;
    if (post_room) {
      caseSuccess(res, "Bạn đã tạo bài đăng thành công. Chờ Admin phê duyệt")
    } else {
      caseErrorUser(res, "Bạn đã tạo bài đăng thất bại");
    }
  } catch (error) {
    caseErrorServer(res, "Error Server");
  }
}
let postsOwnerController = async (req, res) => {
  try {
    var token = req.cookies.token || req.body.token;
    var dataUser = Verify(token, process.env.JWT_SECRET);
    var idOwner = dataUser._id;
    var dataPost = await postsOwnerService(idOwner);
    if (dataPost) {
      res.json({
        status: 200,
        dataPost: dataPost,
        error: false,
        message: "Thông tin những bài đăng của bạn"
      })
    } else {
      caseErrorUser(res, "Không có thông tin của bài đăng nào");
    }
  } catch (error) {
    caseErrorServer(res, "Error Server");
  }
}
let detailPostController = async (req, res) => {
  try {
    var post = await findPostService(req.params.idPost);
    console.log(typeof post);
    if (post) {
      return res.json({
        status: 200,
        error: false,
        dataPost: post,
        message: "Lấy thông tin bài viết thành công"
      })
    } else {
      caseErrorUser(res, "Bạn không lấy được thông tin của bài viết");
    }
  } catch (error) {
    caseErrorServer(res, "Error Server");
  }
}
let updatePostController = async (req, res) => {
  try {
    if (req.body.images_room)
      req.body.images_room = req.body.images_room.split(",");
    var { idPost } = req.params;
    var updatePost = await updatePostService(idPost, req.body);
    if (updatePost) {
      return res.json({
        status: 200,
        error: false,
        message: "Cập nhật thành công người dùng"
      })
    } else {
      caseErrorUser(res, "Cập nhật không thành công")
    }

  } catch (error) {
    caseErrorUser(res, "Error Server");
  }
}
let deletePostController = async (req, res) => {
  try {
    var { idPost } = req.params;
    var deletedPost = await deletePostService(idPost);
    if (deletedPost) {
      caseSuccess(res, "Bạn đã xóa bài viết thành công")
    } else {
      caseErrorUser(res, "Bạn đã xóa bài đăng không thành công");
    }
  } catch (error) {
    caseErrorServer(res, "Error Server");
  }
}

let getAllPostsController = async (req, res) => {
  try {
    var dataPost = await allPostsService();
    if (dataPost) {
      res.json({
        status: 200,
        dataPost: dataPost,
        error: false,
        message: "Thông tin tất cả những bài đăng của bạn"
      })
    } else {
      caseErrorUser(res, "Không có thông tin của bài đăng nào");
    }
  } catch (error) {
    caseErrorUser(res, "Error Server");
  }
}

module.exports = {
  uploadImageLocalController,
  createPostController,
  postsOwnerController,
  detailPostController,
  updatePostController,
  deletePostController,
  getAllPostsController
}