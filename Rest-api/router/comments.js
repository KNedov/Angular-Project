const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { commentController } = require('../controllers');

// middleware that is specific to this router

router.get('/', commentController.getLatestsComments);
router.get('/:phoneId', commentController.getCommentsByPhoneId);

module.exports = router