const { userModel,phoneModel, commentModel } = require('../models');

function newComment(text, userId, phoneId) {
    return commentModel.create({ text, userId, phoneId })
        .then(comment => {
            return Promise.all([
                userModel.updateOne({ _id: userId }, { $push: { comments: comment._id }, $addToSet: { phones: phoneId } }),
                phoneModel.findByIdAndUpdate({ _id: phoneId }, { $push: { comments: comment._id }, $addToSet: { buyers: userId } }, { new: true })
            ])
        })
}

function getLatestsComments(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    commentModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate('userId', 'username')
        .then(comments => {
            res.status(200).json(comments)
          
        })
        .catch(next);
}

function createComment(req, res, next) {
    const { phoneId } = req.params;
    const { _id: userId } = req.user;
    const { commentText } = req.body;

    newComment(commentText, userId, phoneId)
        .then(([_, updatedPhone]) => res.status(200).json(updatedPhone))
        .catch(next);
}

function editComment(req, res, next) {
    const { commentId } = req.params;
    const { commentText } = req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the comment, the comment will not be updated
    commentModel.findOneAndUpdate({ _id: commentId, userId }, { text: commentText }, { new: true })
        .then(updatedComment => {
            if (updatedComment) {
                res.status(200).json(updatedComment);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deleteComment(req, res, next) {
    const { commentId, phoneId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        commentModel.findOneAndDelete({ _id: commentId, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { comments: commentId } }),
        phoneModel.findOneAndUpdate({ _id: phoneId }, { $pull: { comments: commentId } }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function like(req, res, next) {
    const { commentId } = req.params;
    const { _id: userId } = req.user;

    console.log('like')

    commentModel.updateOne({ _id: commentId }, { $addToSet: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next)
}

module.exports = {
  getLatestsComments,
    newComment,
   createComment,
    editComment,
    deleteComment,
    like,
}
