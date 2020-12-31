var { Verify } = require('../utils/JWT')
let {
  infoUserModifyService,
  getOwnerService,
  deleteOwnerService,
  updateStatusService
} = require('../services/modifiesOwnerService');
var { caseSuccess, caseErrorUser, caseErrorServer } = require('../utils/returnValue');
let createModifyController = async (req, res) => {
  try {

    var token = req.cookies.token || req.body.token;
    var dataOwner = Verify(token, process.env.JWT_SECRET);
    var idOwner = dataOwner._id;
    var infoUser = req.body;
    var owner = await infoUserModifyService(idOwner, infoUser);
    if (owner) {
      caseSuccess(res, "Tạo thông tin sửa tài khoản thành công");
    } else {
      caseErrorUser(res, "Tạo thông tin sửa tài khoản không thành công");
    }
  } catch (error) {
    caseErrorServer(res, "Error Server")
  }
}
let getOwnerController = async (req, res) => {
  try {
    var dataOwner = await getOwnerService();
    if (dataOwner) {
      //Nếu tồn tại user   
      return res.json({
        error: false,
        status: 200,
        message: "Thông tin tài khoản owner cần chỉnh sửa",
        dataOwner: dataOwner
      })
    } else {
      //Nếu không tồn tại user 
      caseErrorUser(res, "Bạn cần đăng nhập");
    }
  } catch (error) {
    if (error) {
      console.log('Error getUserDetailController: ', error);
    }
    caseErrorServer(res, "Bạn cần đăng nhập");
    //Nếu không tồn tại user  
  }
}

let cancelOwnerController = async (req, res) => {
  try {

    var { idModify } = req.params;
    var cancelStatus = await updateStatusService(idModify, "cancel");
    if (cancelStatus) {
      caseSuccess(res, "Bạn đã hủy thành công");
    } else {
      caseErrorUser(res, "Bạn đã hủy không thành công");
    }
  } catch (error) {
    caseErrorServer(res, "Error Server")
  }
}

let deleteOwnerController = async (req, res) => {
  try {
    var { idModify } = req.params;
    var deleOwner = await deleteOwnerService(idModify);
    if (deleOwner) {
      caseSuccess(res, "Trở về home thành công");
    } else {
      caseErrorUser(res, "Trở về home thất bại");
    }
  } catch (error) {
    caseErrorServer(res, "Error Server")
  }
}
module.exports = {
  createModifyController,
  getOwnerController,
  deleteOwnerController,
  cancelOwnerController
}