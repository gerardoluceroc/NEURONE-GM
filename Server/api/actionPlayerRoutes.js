const express = require('express');
const router = express.Router();
const actionPlayerController = require('../controllers/actionPlayerController');


router.get('/:app_code/players/:player_code/actions', actionPlayerController.getActionsPlayer);
router.post('/:app_code/players/:player_code/actions', actionPlayerController.postActionPlayer);
router.post('/xdxd', actionPlayerController.test);

module.exports = router;
