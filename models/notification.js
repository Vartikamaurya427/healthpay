const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User collection
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model('Notification', notificationSchema);
