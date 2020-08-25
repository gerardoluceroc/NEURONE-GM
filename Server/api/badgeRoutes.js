const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');
const imageStorage = require('../middlewares/imageStorage');


router.get('/xd13/:filename', badgeController.getBadges);
router.get('/xd13', badgeController.getBadges2);
router.post('/:app_name/badges', badgeController.postBadge);
router.put('/:app_name/badges/:badge_id', badgeController.updateBadge);
router.delete('/:app_name/badges/:badge_id', badgeController.deleteBadge);
router.get('/:app_name/badges/:badge_id', badgeController.getBadge);
router.post('/xd12', imageStorage.upload.single('file'), badgeController.xdxd);
 
module.exports = router;
