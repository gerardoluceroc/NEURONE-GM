const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');


router.get('/:app_name/challenges', challengeController.getChallenges);
router.post('/:app_name/challenges', challengeController.postChallenge);
router.put('/:app_name/challenges/:challenges_id', challengeController.updateChallenge);
router.delete('/:app_name/challenges/:challenges_id', challengeController.deleteChallenge);
router.get('/:app_name/challenges/:actionPlayer_id', challengeController.getChallenge);

module.exports = router;
