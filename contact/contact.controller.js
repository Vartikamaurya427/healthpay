// src/controllers/contactController.js
const { Contact } = require('../models');
const { Op } = require('sequelize');

exports.getContacts = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('JWT userId =', req.user.id);

    const { q, favorite, limit = 30, offset = 0 } = req.query;

    const where = { userId };
    if (q) {
      where[Op.or] = [
        { name:     { [Op.like]: `%${q}%` } },
        { email:    { [Op.like]: `%${q}%` } },
        { username: { [Op.like]: `%${q}%` } },
      ];
    }
    if (favorite === 'true')  where.isFavorite = true;
    if (favorite === 'false') where.isFavorite = false;

    const contacts = await Contact.findAll({
      where,
      order: [['isFavorite', 'DESC'], ['name', 'ASC']],
      limit:  +limit,
      offset: +offset,
    });

    res.json({ contacts });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contacts', error: err.message });
  }
};

// ⭐ favourite on/off
exports.toggleFavorite = async (req, res) => {
  try {
    const { id } = req.params;            // contact id
    const { isFavorite } = req.body;      // true / false
    const userId = req.user.id;

    const [rows] = await Contact.update(
      { isFavorite },
      { where: { id, userId } }
    );

    if (!rows) return res.status(404).json({ message: 'Contact not found' });

    const updated = await Contact.findByPk(id);
    res.json({ message: 'Favorite updated', contact: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating favorite', error: err.message });
  }
};
