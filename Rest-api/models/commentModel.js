const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 3
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
    phoneId: {
        type: ObjectId,
        ref: "Phone"
    },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Comment', commentSchema);
