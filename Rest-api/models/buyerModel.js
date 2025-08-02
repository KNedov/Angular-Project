const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const buyerSchema = new mongoose.Schema({
 
  buyers: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    default: [],
    validate: [{
      validator: function(array) {
    
        return array.every(id => mongoose.Types.ObjectId.isValid(id));
      },
      message: 'Invalid User ID'
    }]
  }
});

module.exports = mongoose.model("Buyer", buyerSchema);