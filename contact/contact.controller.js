// src/controllers/contactController.js
const Contact = require('../models/Contact'); // Mongoose model
const mongoose = require('mongoose');

exports.getContacts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { q, favorite, limit = 30, offset = 0 } = req.query;

    const filter = { userId };

    if (q) {
      filter.$or = [
        { name:     { $regex: q, $options: 'i' } },
        { email:    { $regex: q, $options: 'i' } },
        { username: { $regex: q, $options: 'i' } },
      ];
    }

    if (favorite === 'true')  filter.isFavorite = true;
    if (favorite === 'false') filter.isFavorite = false;

    const contacts = await Contact.find(filter)
      .sort({ isFavorite: -1, name: 1 })
      .skip(parseInt(offset))
      .limit(parseInt(limit));

    res.json({ contacts });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contacts', error: err.message });
  }
};

// ⭐ Toggle favorite
exports.toggleFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const { isFavorite } = req.body;
    const userId = req.user.id;

    const updated = await Contact.findOneAndUpdate(
      { _id: id, userId },
      { isFavorite },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Contact not found' });

    res.json({ message: 'Favorite updated', contact: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating favorite', error: err.message });
  }
};
