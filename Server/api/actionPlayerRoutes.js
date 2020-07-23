const express = require('express');
const router = express.Router();
const actionPlayerController = require('../controllers/actionPlayerController');


router.get('/:app_name/players/:player_id/actions', actionPlayerController.getActionsPlayer);
router.post('/:app_name/players/:player_id/actions', actionPlayerController.postActionPlayer);

module.exports = router;
