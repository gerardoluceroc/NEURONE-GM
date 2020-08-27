const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');
const imageStorage = require('../middlewares/imageStorage');
const badgeMidl = require('../middlewares/badgeMiddleware');
const appMidl = require('../middlewares/applicationMiddleware');

router.get('/:app_code/badges', badgeController.getBadges);
router.post('/:app_code/badges', [appMidl.checkAppCodeParam, imageStorage.upload.single('file'), badgeMidl.checkCreate], badgeController.postBadge);
router.put('/:app_code/badges/:badge_code', [appMidl.checkAppCodeParam, badgeMidl.checkBadge,  imageStorage.upload.single('file'), badgeMidl.checkCode] , badgeController.updateBadge);
router.delete('/:app_code/badges/:badge_code', badgeController.deleteBadge);
router.get('/:app_code/badges/:badge_code', badgeController.getBadge);
 
module.exports = router;
