// models/BankAccount.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankAccountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // referencing User collection
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    required: true
  },
  ifscCode: {
    type: String,
    required: true
  },
  isPrimary: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BankAccount', bankAccountSchema);
