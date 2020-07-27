const express = require('express');
const router = express.Router();
const actionChallengeController = require('../controllers/actionChallengeController');


router.get('/:app_code/challengesactions', actionChallengeController.getActionsChallenges);
router.get('/:app_code/challengesactions/test', actionChallengeController.test);

module.exports = router;
