const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { phoneController } = require('../controllers');

router.get('/cart', phoneController.getCartItems);


module.exports = router