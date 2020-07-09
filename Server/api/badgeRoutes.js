const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');


router.get('/:app_name/badges', badgeController.getBadges);
router.post('/:app_name/badges', badgeController.postBadge);
router.put('/:app_name/badges/:badge_id', badgeController.updateBadge);
router.delete('/:app_name/badges/:badge_id', badgeController.deleteBadge);
router.get('/:app_name/badges/:badge_id', badgeController.getBadge);
 
module.exports = router;
