const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      phone: {
        type: ObjectId,
        ref: "Phone",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});


module.exports = mongoose.model('Cart', cartSchema);

