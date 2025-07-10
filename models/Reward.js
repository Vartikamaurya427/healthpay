const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming User is stored with ObjectId
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['scratch_card', 'cashback', 'referral', 'offer'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'used', 'expired'],
    default: 'active'
  },
  metaData: {
    type: Object,
    default: {}
  }
}, { timestamps: true }); // includes createdAt and updatedAt

module.exports = mongoose.model('Reward', rewardSchema);
