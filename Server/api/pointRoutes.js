const express = require('express');
const router = express.Router();
const pointController = require('../controllers/pointController');


router.get('/:app_name/points', pointController.getPoints);
router.post('/:app_name/points', pointController.postPoint);
router.put('/:app_name/points/:point_id', pointController.updatePoint);
router.delete('/:app_name/points/:point_id', pointController.deletePoint);
router.get('/:app_name/points/:point_id', pointController.getPoint);

module.exports = router;
