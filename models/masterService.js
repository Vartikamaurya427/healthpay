const mongoose = require("mongoose");

const masterServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  icon: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: 'MasterServices'
});

module.exports.MasterService = mongoose.model('MasterService', masterServiceSchema);
