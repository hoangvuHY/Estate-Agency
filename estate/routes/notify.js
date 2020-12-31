var express = require('express');
var router = express.Router();
var { createNotifyController, displayNotifyController,allNotifyHiredController, deleteNotifyOwnerController } = require('../controllers/notifyController');
var { checkAuth, checkOwner, checkAdmin,checkOwner_Admin } = require('../middleware/index')
/* GET users listing. */
router.use(checkAuth);
router.post('/create-notify', checkOwner_Admin, createNotifyController);
router.get('/owner-notifies', checkOwner, displayNotifyController);
router.get('/hired-notifies', checkAdmin, allNotifyHiredController);
router.delete('/notify-delete/:idNotify', checkOwner, deleteNotifyOwnerController);
// router.put('/modify', updateUserController);

module.exports = router;
