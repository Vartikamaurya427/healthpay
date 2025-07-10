const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  identifier: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('Otp', otpSchema);
