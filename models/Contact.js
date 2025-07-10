// models/Contact.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Association with User
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  username: {
    type: String
  },
  profileImage: {
    type: String
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true, // adds createdAt and updatedAt
  collection: 'Contacts' // same as tableName in Sequelize
});

module.exports = mongoose.model('Contact', contactSchema);
