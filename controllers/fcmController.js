const { FcmToken } = require('../models/FcmToken');

// Save FCM token
exports.saveFcmToken = async (req, res) => {
  const { userId, token } = req.body;

  if (!userId || !token) {
    return res.status(400).json({ message: 'userId and token are required' });
  }

  try {
    const existing = await FcmToken.findOne({ userId, token });

    if (!existing) {
      await FcmToken.create({ userId, token });
    }

    res.status(200).json({ message: 'Token saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving token', error: error.message });
  }
};

// Get FCM token by user ID
exports.getFcmTokenByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const token = await FcmToken.findOne({ userId });

    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving token", error: err.message });
  }
};
