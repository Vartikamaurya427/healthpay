const { LoginActivity } = require('../models/LoginActivity');

exports.getLoginActivity = async (req, res) => {
  try {
    const userId = req.user.id;

    const activities = await LoginActivity.find({ userId })
      .sort({ loggedInAt: -1 })  // DESC order
      .limit(10);                // Limit to 10 records

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
