const express = require('express');
const router = express.Router();
const levelController = require('../controllers/levelController');


router.get('/:app_code/levels', levelController.getLevels);
router.post('/:app_code/levels', levelController.postLevel);
router.put('/:app_code/levels/:level_code', levelController.updateLevel);
router.delete('/:app_code/levels/:level_code', levelController.deleteLevel);
router.get('/:app_code/levels/:level_code', levelController.getLevel);

module.exports = router;
