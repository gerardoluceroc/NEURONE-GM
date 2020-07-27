const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');


router.get('/:app_code/challenges', challengeController.getChallenges);
router.post('/:app_code/challenges', challengeController.postChallenge);
router.get('/:app_code/challenges/requisites', challengeController.getChallengesRequisites);
router.put('/:app_code/challenges/:challenge_code', challengeController.updateChallenge);
router.delete('/:app_code/challenges/:challenge_code', challengeController.deleteChallenge);
router.get('/:app_code/challenges/:actionPlayer_id', challengeController.getChallenge);

module.exports = router;
