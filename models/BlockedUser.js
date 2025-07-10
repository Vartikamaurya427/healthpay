const mongoose = require("mongoose");

const blockedUserSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  blockedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports.BlockedUser = mongoose.model("BlockedUser", blockedUserSchema);
