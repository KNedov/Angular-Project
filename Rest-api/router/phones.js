const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const {  phoneController,commentController } = require('../controllers');

// middleware that is specific to this router

router.get('/', phoneController.getLatestsPhones);
router.post('/create', auth(), phoneController.createPhone);

router.get('/:phoneId', phoneController.getPhone);
router.put('/:phoneId',auth(), phoneController.editPhone);
router.delete('/:phoneId',auth(), phoneController.deletePhone);
router.post('/:phoneId/comments', auth(), commentController.createComment);
router.post('/:phoneId/buy', auth(), phoneController.buyPhone);
router.put('/:phoneId', auth(), phoneController.buy);
router.put('/:phoneId/comments/:commentId', auth(), commentController.editComment);
router.delete('/:phoneId/comments/:commentId', auth(), commentController.deleteComment);

// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router