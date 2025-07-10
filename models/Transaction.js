const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  toUserEmail: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['send', 'receive', 'topup', 'request'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },
  transactionId: {
    type: String
  },
  referenceId: {
    type: String
  },
  note: {
    type: String
  }
}, {
  timestamps: true,
  collection: 'transactions'
});

module.exports = mongoose.model('Transaction', transactionSchema);
