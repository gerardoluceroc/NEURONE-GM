const express = require('express');
const router = express.Router();
const pointController = require('../controllers/pointController');
const imageStorage = require('../middlewares/imageStorage');
const pointMidl = require('../middlewares/pointMiddleware');
const appMidl = require('../middlewares/applicationMiddleware');


router.get('/:app_code/points', pointController.getPoints);
router.post('/:app_code/points', [appMidl.checkAppCodeParam, imageStorage.upload.single('file'), pointMidl.checkCreate], pointController.postPoint);
router.put('/:app_code/points/:point_code', [appMidl.checkAppCodeParam, pointMidl.checkPoint, imageStorage.upload.single('file'), pointMidl.checkCode], pointController.updatePoint);
router.delete('/:app_code/points/:point_code', pointController.deletePoint);
router.get('/:app_code/points/:point_code', pointController.getPoint);

module.exports = router;
