const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');


router.get('/:app_name/players', playerController.getPlayers);
router.post('/:app_name/players', playerController.postPlayer);
router.put('/:app_name/players/:player_id', playerController.updatePlayer);
router.delete('/:app_name/players/:player_id', playerController.deletePlayer);
router.get('/:app_name/players/:player_id', playerController.getPlayer);

module.exports = router;
