const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const phoneSchema = new mongoose.Schema(
    {
        phoneName: {
            type: String,
            required: true,
        },
        displaySize: {
            type: String,
            required: true,
            min: 1,
        },
        color: {
            type: String,
            required: true,
            minlength: 1,
        },
        cpu: {
            type: String,
            required: true,
            minlength: 1,
        },
        ram: {
            type: String,
            required: true,
            minlength: 1,
        },
        storage: {
            type: String,
            required: true,
            minlength: 1,
        },
        price: {
            type: Number,
            required: true,
            min: 1,
        },
        image: {
            type: String,
            required: true,
            match: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
        },

        userId: {
            type: ObjectId,
            ref: "User",
        },
        buyers: [
            {
                type: ObjectId,
                ref: "Buyers",
            },
        ],
        comments: [
            {
                type: ObjectId,
                ref: "Comment",
            },
        ],
    },
    { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Phone", phoneSchema);
