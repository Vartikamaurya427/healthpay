const mongoose = require('mongoose');

const userPrivacySettingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  permissionGiven: {
    type: Boolean,
    default: false
  },
  searchPrivacy: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: 'user_privacy_settings'
});

module.exports = mongoose.model('UserPrivacySetting', userPrivacySettingSchema);
