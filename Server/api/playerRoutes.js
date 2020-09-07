const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');
const authMidl = require('../middlewares/authMiddleware');

router.get('/:app_code/players',  [authMidl.verifyToken], playerController.getPlayers);
router.post('/:app_code/players', [authMidl.verifyToken], playerController.postPlayer);
router.put('/:app_code/players/:player_code', [authMidl.verifyToken], playerController.updatePlayer);
router.delete('/:app_code/players/:player_code', [authMidl.verifyToken], playerController.deletePlayer);
router.get('/:app_code/players/:player_code', [authMidl.verifyToken], playerController.getPlayer);
router.get('/:app_code/players/:player_code/completed-challenges', [authMidl.verifyToken], playerController.getPlayerCompletedChallenges);
router.get('/:app_code/players/:player_code/player-points', [authMidl.verifyToken],  playerController.getPlayerPoints);
router.get('/:app_code/players/:player_code/badges', [authMidl.verifyToken], playerController.getPlayerBadges);

module.exports = router;
