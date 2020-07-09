const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');


router.get('/:app_name/groups', groupController.getGroups);
router.post('/:app_name/groups', groupController.postGroup);
router.put('/:app_name/groups/:group_id', groupController.updateGroup);
router.delete('/:app_name/groups/:group_id', groupController.deleteGroup);
router.get('/:app_name/groups/:group_id', groupController.getGroup);

module.exports = router;
