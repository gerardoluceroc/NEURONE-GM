const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');
const appMidl = require('../middlewares/applicationMiddleware');
const authMidl = require('../middlewares/authMiddleware');

router.get('/:app_code/leaderboards', [authMidl.verifyToken], leaderboardController.getLeaderboards);
router.post('/:app_code/leaderboards', [authMidl.verifyToken, appMidl.checkOwner], leaderboardController.postLeaderboard);
router.put('/:app_code/leaderboards/:leaderboard_code', [authMidl.verifyToken, appMidl.checkOwner], leaderboardController.updateLeaderboard);
router.delete('/:app_code/leaderboards/:leaderboard_code', [authMidl.verifyToken, appMidl.checkOwner], leaderboardController.deleteLeaderboard);
router.get('/:app_code/leaderboards/:leaderboard_code', [authMidl.verifyToken], leaderboardController.getLeaderboard);
router.post('/:app_code/leaderboards/:leaderboard_code/generate', [authMidl.verifyToken], leaderboardController.makeLeaderboard)

module.exports = router;
