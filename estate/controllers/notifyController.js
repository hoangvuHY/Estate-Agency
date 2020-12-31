var {
  createNotifyService,
  allNotifyOwnerService,
  deleteNotifyOwnerService,
  allNotifyHiredService
} = require('../services/notifiesService');
var { caseSuccess, caseErrorUser, caseErrorServer } = require('../utils/returnValue');
var { Verify } = require('../utils/JWT');


var createNotifyController = async (req, res) => {
  try {
    var notifyObject = req.body;
    console.log(req.body);
    var notify = await createNotifyService(notifyObject);
    if (notify) {
      caseSuccess(res, "Bạn đã tạo thông báo thành công")
    } else {
      caseErrorUser(res, "Bạn đã không tạo thông báo thành công");
    }
  } catch (error) {
    caseErrorServer(res, "Error Server");
  }
}

var displayNotifyController = async (req, res) => {
  try {
    var token = req.cookies.token || req.body.token;
    var dataUser = Verify(token, process.env.JWT_SECRET);
    var idOwner = dataUser._id;
    var notifyOwner = await allNotifyOwnerService(idOwner);
    if (notifyOwner) {
      res.json({
        error: false,
        notifyOwner: notifyOwner,
        status: 200
      })
    } else {
      caseErrorUser(res, "Bạn đã không tạo được thông báo")
    }
  } catch (error) {
    caseErrorServer(res, "Error Server");
  }
}
var deleteNotifyOwnerController = async (req, res) => {
  try {
    var deleteNotify = await deleteNotifyOwnerService(req.params.idNotify);
    if (deleteNotify) {
      caseSuccess(res, "Bạn đã xóa thông báo thành công");
    } else {
      caseErrorUser(res, "Bạn đã xóa thông báo không thành công")
    }
  } catch (error) {
    caseErrorUser(res, "Error Server");
  }
} 
let allNotifyHiredController = async (req, res) => {
  try { 
    var notifyHired = await allNotifyHiredService();
    if (notifyHired) {
      res.json({
        error: false,
        notifyHired: notifyHired,
        status: 200
      })
    } else {
      caseErrorUser(res, "Bạn đã không tạo được thông báo")
    }
  } catch (error) {
    caseErrorServer(res, "Error Server");
  }
}
module.exports = {
  createNotifyController,
  displayNotifyController,
  deleteNotifyOwnerController,
  allNotifyHiredController
}