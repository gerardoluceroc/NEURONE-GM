const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.get('/applications', applicationController.getApps);
router.post('/applications', applicationController.postApp);
router.put('/applications/:app_code', applicationController.updateApp);
router.delete('/applications/:app_code', applicationController.deleteApp);
router.get('/applications/:app_code', applicationController.getApp);
router.get('/applications/:user_id/focus', applicationController.getFocusApp);

module.exports = router;
