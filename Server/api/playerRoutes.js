const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');


router.get('/:app_code/players', playerController.getPlayers);
router.post('/:app_code/players', playerController.postPlayer);
router.put('/:app_code/players/:player_code', playerController.updatePlayer);
router.delete('/:app_code/players/:player_code', playerController.deletePlayer);
router.get('/:app_code/players/:player_code', playerController.getPlayer);
router.get('/:app_code/players/:player_code/completed-challenges', playerController.getPlayerCompletedChallenges);
router.get('/:app_code/players/:player_code/player-points', playerController.getPlayerPoints);

module.exports = router;
