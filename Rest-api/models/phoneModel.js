const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const phoneSchema = new mongoose.Schema({
    phoneName: {
        type: String,
        required: true
    },
    buyers: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
    comments: [{
        type: ObjectId,
        ref: "Comment"
    }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Phone', phoneSchema);
