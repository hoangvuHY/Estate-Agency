let { getUserByIdService, updateUserService } = require('../services/userService');
let { updateStatusService } = require('../services/modifiesOwnerService')
var { caseSuccess, caseErrorUser, caseErrorServer } = require('../utils/returnValue');
var { Verify } = require('../utils/JWT');

let getUserDetailController = async (req, res) => {
  try {
    var token = req.cookies.token || req.body.token;
    var data = Verify(token, process.env.JWT_SECRET);
    var dataUser = await getUserByIdService(data._id);
    dataUser.password = undefined;
    if (dataUser) {
      //Nếu tồn tại user 
      return res.json({
        error: false,
        status: 200,
        message: "Thông tin tài khoản của bạn",
        dataUser: dataUser
      })
    } else {
      //Nếu không tồn tại user 
      caseErrorUser(res, "Bạn cần đăng nhập");
    }
  } catch (error) {
    caseErrorServer(res, "Error Server");
    //Nếu không tồn tại user  
  }
}

let updateUserController = async (req, res) => {
  try {
    var { idModify } = req.params;
    await updateStatusService(idModify, "active");
    var ownerModify = req.body;
    var userModify = await updateUserService(ownerModify.idOwner, ownerModify.name, ownerModify.phone, ownerModify.address, ownerModify.username);
    if (userModify.nModified > 0) {
      caseSuccess(res, "Cập nhật người dùng thành công");
    } else {
      caseErrorUser(res, "Người dùng không tồn tại và sửa không thành công");
    }
  } catch (error) {
    //Nếu không tồn tại user 
    caseErrorServer(res, "Error Server");
  }
}



module.exports = {
  getUserDetailController,
  updateUserController,
}