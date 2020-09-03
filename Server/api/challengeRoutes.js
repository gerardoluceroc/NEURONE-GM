const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');
const challMidl = require('../middlewares/challengeMiddleware');
const appMidl = require('../middlewares/applicationMiddleware');


router.get('/:app_code/challenges', challengeController.getChallenges);
router.post('/:app_code/challenges', [appMidl.checkAppCodeParam, challMidl.checkBody], challengeController.postChallenge);
router.get('/:app_code/challenges/requisites', challengeController.getChallengesRequisites);
router.put('/:app_code/challenges/:challenge_code', [appMidl.checkAppCodeParam, challMidl.checkChallenge, challMidl.checkCode], challengeController.updateChallenge);
router.delete('/:app_code/challenges/:challenge_code', [challMidl.checkChallenge], challengeController.deleteChallenge);
router.get('/:app_code/challenges/:actionPlayer_id', challengeController.getChallenge);

module.exports = router;
