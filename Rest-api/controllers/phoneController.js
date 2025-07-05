const {  phoneModel } = require('../models');
const { newComment } = require('./commentController');


function getPhones(req, res, next) {
    phoneModel.find()
        .populate('userId')
        .then(phones => res.json(phones))
        .catch(next);
}

function getPhone(req, res, next) {
    const { phoneId } = req.params;

    phoneModel.findById(phoneId)
        .populate({
            path : 'comments',
            populate : {
              path : 'userId'
            }
          })
        .then(phone => res.json(phone))
        .catch(next);
}

function createPhone(req, res, next) {
    const { phoneName: phoneName, commentText } = req.body;
    const { _id: userId } = req.user;

    phoneModel.create({ phoneName: phoneName, userId, buyers: [userId] })
        .then(phone => {
            newComment(commentText, userId, phone._id)
                .then(([_, updatedPhone]) => res.status(200).json(updatedPhone))
        })
        .catch(next);
}

function buy(req, res, next) {
    const phoneId = req.params.phoneId;
    const { _id: userId } = req.user;
    phoneModel.findByIdAndUpdate({ _id: phoneId }, { $addToSet: { buyers: userId } }, { new: true })
        .then(updatedPhone => {
            res.status(200).json(updatedPhone)
        })
        .catch(next);
}

module.exports = {
    getPhones,
    createPhone,
    getPhone,
    buy,
}
