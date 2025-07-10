const mongoose = require("mongoose");

const fcmTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  collection: 'FcmTokens'
});

module.exports.FcmToken = mongoose.model('FcmToken', fcmTokenSchema);
