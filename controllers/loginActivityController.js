// controllers/loginActivityController.js
const { LoginActivity } = require('../models');
exports.getLoginActivity = async (req, res) => {
  try {
    const userId = req.user.id; 
    const activities = await LoginActivity.findAll({
      where: { userId },
      order: [['loggedInAt', 'DESC']], 
      limit: 10, // Adjust based on how many records you want to fetch
    });
    if (!activities || activities.length === 0) {
      return res.status(404).json({ message: 'No login activity found for this user' });
    }
    res.status(200).json({
      message: 'Login activities fetched successfully',
      data: activities,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching login activities', error: err.message });
  }
};
