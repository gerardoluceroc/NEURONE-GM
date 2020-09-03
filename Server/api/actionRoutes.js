const express = require('express');
const router = express.Router();
const actionController = require('../controllers/actionController');
const imageStorage = require('../middlewares/imageStorage');
const actMidl = require('../middlewares/actionMiddleware');
const appMidl = require('../middlewares/applicationMiddleware');

router.get('/:app_code/actions', actionController.getActions);
router.post('/:app_code/actions', [appMidl.checkAppCodeParam, imageStorage.upload.single('file'), actMidl.checkCreate], actionController.postAction);
router.put('/:app_code/actions/:action_code', [appMidl.checkAppCodeParam, actMidl.checkAction,  imageStorage.upload.single('file'), actMidl.checkCode] , actionController.updateAction);
router.delete('/:app_code/actions/:action_code', [actMidl.checkAction], actionController.deleteAction);
router.get('/:app_code/actions/:action_code', actionController.getAction);

module.exports = router;
