const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');


router.get('/:app_code/leaderboards', leaderboardController.getLeaderboards);
router.post('/:app_code/leaderboards', leaderboardController.postLeaderboard);
router.put('/:app_code/leaderboards/:leaderboard_code', leaderboardController.updateLeaderboard);
router.delete('/:app_code/leaderboards/:leaderboard_code', leaderboardController.deleteLeaderboard);
router.get('/:app_code/leaderboards/:leaderboard_code', leaderboardController.getLeaderboard);
router.get('/:app_code/leaderboards/:leaderboard_code/generate', leaderboardController.makeLeaderboard)

module.exports = router;
