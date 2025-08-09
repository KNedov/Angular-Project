const mongoose = require("mongoose");
const { userModel, phoneModel, commentModel } = require("../models");

function newComment(text, userId, phoneId) {
    return commentModel
        .create({ text, userId, phoneId })
        .then((comment) => {
            return Promise.all([
                userModel.findById(userId),
                phoneModel.findById(phoneId),
            ]).then(([user, phone]) => {
                if (!user) throw new Error("User not found");
                if (!phone) throw new Error("Phone not found");
                return Promise.all([
                    userModel.updateOne(
                        { _id: userId },
                        { $push: { comments: comment._id } }
                    ),
                    phoneModel.updateOne(
                        { _id: phoneId },
                        { $push: { comments: comment._id } }
                    ),
                ]).then(() => {
                    return commentModel
                        .find({ phoneId })
                        .populate("userId", "username")
                        .sort({ createdAt: -1 });
                });
            });
        })
        .catch((error) => {
            console.error("Error in newComment:", error);
            throw error;
        });
}

function getLatestsComments(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    commentModel
        .find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate("userId", "username")
        .then((comments) => {
            res.status(200).json(comments);
        })
        .catch(next);
}
function getCommentByPhoneId(req, res, next) {
    const { phoneId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(phoneId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid phone ID format",
        });
    }

    commentModel
        .find({ phoneId })
        .populate("userId", "username")
        .populate("likes", "username _id")
        .sort({ created_at: -1 })
        .then((comments) => {
            res.status(200).json({
                success: true,
                count: comments.length,
                data: comments,
            });
        })
        .catch((error) => {
            console.error("Error:", error);
            res.status(500).json({
                success: false,
                message: "Server error",
                error: error.message,
            });
        });
}

function createComment(req, res, next) {
    const { phoneId } = req.params;
    const { _id: userId } = req.user;
    const { commentText } = req.body;

    newComment(commentText, userId, phoneId).then((updatedComments) =>
        res.status(200).json(updatedComments)
    );
}

function editComment(req, res, next) {
    const { commentId } = req.params;
    const { commentText } = req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the comment, the comment will not be updated
    commentModel
        .findOneAndUpdate(
            { _id: commentId, userId },
            { text: commentText },
            { new: true }
        )
        .then((updatedComment) => {
            if (updatedComment) {
                res.status(200).json(updatedComment);
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deleteComment(req, res, next) {
    const { commentId, phoneId } = req.params;
    const { _id: userId } = req.user;

    commentModel
        .findOne({ _id: commentId, userId })
        .then((comment) => {
            if (!comment) {
                return res
                    .status(401)
                    .json({ message: "Not allowed or comment not found!" });
            }

            return Promise.all([
                commentModel.findOneAndDelete({ _id: commentId, userId }),
                userModel.findOneAndUpdate(
                    { _id: userId },
                    { $pull: { comments: commentId } }
                ),
                phoneModel.findOneAndUpdate(
                    { _id: phoneId },
                    { $pull: { comments: commentId } }
                ),
            ]);
        })
        .then(([deletedComment, _, __]) => {
            if (!deletedComment) {
                return res.status(404).json({ message: "Comment not found" });
            }

            return commentModel
                .find({ phoneId })
                .populate("userId", "username")
                .sort({ createdAt: -1 });
        })
        .then((updatedComments) => {
            res.status(200).json(updatedComments);
        })
        .catch(next);
}

function like(req, res, next) {
    const { commentId } = req.params;
    const { _id: userId } = req.user;

    commentModel
        .findOneAndUpdate(
            { _id: commentId },
            { $addToSet: { likes: userId } },
            { new: true }
        )
        .populate("likes", "username _id")
        .populate("userId", "username _id")
        .then((updatedComment) => {
            if (!updatedComment) {
                return res.status(404).json({ message: "Comment not found" });
            }
            res.status(200).json(updatedComment);
        })
        .catch((error) => {
            next(error);
        });
}

module.exports = {
    getLatestsComments,
    newComment,
    createComment,
    editComment,
    deleteComment,
    like,
    getCommentsByPhoneId: getCommentByPhoneId,
};
