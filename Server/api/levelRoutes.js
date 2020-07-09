const express = require('express');
const router = express.Router();
const levelController = require('../controllers/levelController');


router.get('/:app_name/levels', levelController.getLevels);
router.post('/:app_name/levels', levelController.postLevel);
router.put('/:app_name/levels/:level_id', levelController.updateLevel);
router.delete('/:app_name/levels/:level_id', levelController.deleteLevel);
router.get('/:app_name/levels/:level_id', levelController.getLevel);

module.exports = router;
