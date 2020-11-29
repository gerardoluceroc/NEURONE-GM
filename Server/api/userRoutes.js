const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/gm-signup', userController.gmSignUp);
router.post('/signin', userController.signin);


module.exports = router;
