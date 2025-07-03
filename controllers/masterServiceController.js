const { MasterService } = require('../models');
const { Op } = require('sequelize');

exports.createService = async (req, res) => {
  try {
    const service = await MasterService.create(req.body);
    res.status(201).json({ message: 'Service added', service });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create service', error: err.message });
  }
};
exports.getAllServices = async (req, res) => {
  try {
    const services = await MasterService.findAll({ where: { isActive: true } });
    res.json({ services });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching services', error: err.message });
  }
};
const {fn, col, where } = require('sequelize');

exports.searchServices = async (req, res) => {
  try {
    let query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: 'Query parameter "q" is required' });
    }

    query = query.toLowerCase();

    const services = await MasterService.findAll({
      where: {
        [Op.and]: [
          where(fn('LOWER', col('name')), { [Op.like]: `%${query}%` }),
          { isActive: true }
        ]
      },
      limit: 10
    });

    res.status(200).json({ message: 'Services found', services });
  } catch (error) {
    res.status(500).json({ message: 'Error searching services', error: error.message });
  }
};

