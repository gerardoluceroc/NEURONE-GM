const express = require('express');
const router = express.Router();
const actionController = require('../controllers/actionController');

router.get('/:app_name/actions', actionController.getActions);
router.post('/:app_name/actions', actionController.postAction);
router.put('/:app_name/actions/:action_id', actionController.updateAction);
router.delete('/:app_name/actions/:action_id', actionController.deleteAction);
router.get('/:app_name/actions/:action_id', actionController.getAction);

module.exports = router;
