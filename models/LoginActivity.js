const mongoose = require("mongoose");

const loginActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  device: {
    type: String,
    default: 'Unknown'
  },
  ipAddress: {
    type: String,
    default: 'Unknown'
  },
  location: {
    type: String,
    default: 'Unknown'
  },
  loggedInAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: "LoginActivities"
});

module.exports.LoginActivity = mongoose.model("LoginActivity", loginActivitySchema);
