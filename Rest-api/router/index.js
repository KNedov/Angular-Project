const router = require('express').Router();
const users = require('./users');
const phones = require('./phones');
const comments = require('./comments');
const likes = require('./likes');
const test = require('./test');
const cart = require('./cart');
const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/phones', phones);
router.use('/comments', comments);
router.use('/cart', cart);
router.use('/likes', likes);
router.use('/test', test);

module.exports = router;
