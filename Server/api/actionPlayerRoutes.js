const express = require('express');
const router = express.Router();
const actionPlayerController = require('../controllers/actionPlayerController');


router.get('/:app_code/players/:player_code/actions', actionPlayerController.getActionsPlayer);
router.post('/:app_code/players/:player_code/actions', actionPlayerController.postActionPlayer);

module.exports = router;
