const express = require('express');
const router = express.Router();
const actionController = require('../controllers/actionController');

router.get('/:app_code/actions', actionController.getActions);
router.post('/:app_code/actions', actionController.postAction);
router.put('/:app_code/actions/:action_code', actionController.updateAction);
router.delete('/:app_code/actions/:action_code', actionController.deleteAction);
router.get('/:app_code/actions/:action_code', actionController.getAction);

module.exports = router;
