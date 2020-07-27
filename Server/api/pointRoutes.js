const express = require('express');
const router = express.Router();
const pointController = require('../controllers/pointController');


router.get('/:app_code/points', pointController.getPoints);
router.post('/:app_code/points', pointController.postPoint);
router.put('/:app_code/points/:point_code', pointController.updatePoint);
router.delete('/:app_code/points/:point_code', pointController.deletePoint);
router.get('/:app_code/points/:point_code', pointController.getPoint);

module.exports = router;
