const express = require('express');
const router = express.Router();
const levelController = require('../controllers/levelController');
const imageStorage = require('../middlewares/imageStorage');
const lvlMidl = require('../middlewares/levelMiddleware');
const appMidl = require('../middlewares/applicationMiddleware');


router.get('/:app_code/levels', levelController.getLevels);
router.post('/:app_code/levels', [appMidl.checkAppCodeParam, imageStorage.upload.single('file'), lvlMidl.checkCreate], levelController.postLevel);
router.put('/:app_code/levels/:level_code', [appMidl.checkAppCodeParam, lvlMidl.checkLevel,  imageStorage.upload.single('file'), lvlMidl.checkCode], levelController.updateLevel);
router.delete('/:app_code/levels/:level_code', levelController.deleteLevel);
router.get('/:app_code/levels/:level_code', levelController.getLevel);

module.exports = router;
