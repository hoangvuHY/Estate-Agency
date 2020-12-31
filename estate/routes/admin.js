var express = require('express');
var router = express.Router();
var { getOwnerController, cancelOwnerController } = require('../controllers/modifyController');
var { updateUserController } = require('../controllers/userController');
let { checkAuth, checkAdmin } = require('../middleware/index');

/* GET users listing. */
router.get('/owner-verify', getOwnerController);
router.use(checkAuth);
router.use(checkAdmin);
router.put('/accept-owner/:idModify', updateUserController);
router.put('/cancel-owner/:idModify', cancelOwnerController);

// router.put('/modify', updateUserController);

module.exports = router;
