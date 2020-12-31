var express = require('express');
var router = express.Router();
var { createModifyController, deleteOwnerController } = require('../controllers/modifyController');
var { isIdOwnerMiddleware } = require('../middleware/index')
router.post('/info-user', isIdOwnerMiddleware, createModifyController);
router.delete('/delete-owner/:idModify', deleteOwnerController);
module.exports = router;