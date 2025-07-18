const { UserPrivacySetting } = require('../models/UserPrivacySetting');
const { BlockedUser } = require('../models/BlockedUser');
const { User } = require('../models/User');

exports.getPrivacySettings = async (req, res) => {
  try {
    const userId = req.user.id;
    let settings = await UserPrivacySetting.findOne({ userId });

    if (!settings) {
      settings = await UserPrivacySetting.create({ userId });
    }

    const parsedSettings = {
      ...settings.toObject(),
      blockedContacts: JSON.parse(settings.blockedContacts || '[]')
    };

    res.status(200).json(parsedSettings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching privacy settings', error: err.message });
  }
};

exports.updatePrivacySettings = async (req, res) => {
  try {
    const userId = req.user.id;

    await UserPrivacySetting.updateOne({ userId }, req.body, { upsert: true });

    const updated = await UserPrivacySetting.findOne({ userId });
    const parsedUpdated = {
      ...updated.toObject(),
      blockedContacts: JSON.parse(updated.blockedContacts || '[]')
    };

    res.status(200).json({
      message: 'Privacy settings updated',
      data: parsedUpdated
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating privacy settings', error: err.message });
  }
};

exports.downloadUserData = async (req, res) => {
  try {
    const userId = req.user.id;

    const privacy = await UserPrivacySetting.findOne({ userId });

    const parsedPrivacy = {
      ...privacy.toObject(),
      blockedContacts: JSON.parse(privacy.blockedContacts || '[]')
    };

    res.status(200).json({
      message: "User data exported",
      data: {
        privacySettings: parsedPrivacy
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error downloading user data', error: err.message });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { blockedUserId } = req.body;

    if (!blockedUserId) {
      return res.status(400).json({ message: 'blockedUserId is required' });
    }

    if (userId === blockedUserId) {
      return res.status(400).json({ message: 'You cannot block yourself' });
    }

    const existing = await BlockedUser.findOne({ userId, blockedUserId });
    if (existing) {
      return res.status(400).json({ message: 'User already blocked' });
    }

    const blocked = await BlockedUser.create({ userId, blockedUserId });
    res.status(200).json({ message: 'User blocked', data: blocked });
  } catch (err) {
    res.status(500).json({ message: 'Error blocking user', error: err.message });
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { blockedUserId } = req.body;

    const result = await BlockedUser.deleteOne({ userId, blockedUserId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No such blocked user found' });
    }

    res.status(200).json({ message: 'User unblocked' });
  } catch (err) {
    res.status(500).json({ message: 'Error unblocking user', error: err.message });
  }
};

exports.getBlockedUsers = async (req, res) => {
  try {
    const userId = req.user.id;

    const blocked = await BlockedUser.find({ userId });

    res.status(200).json({ blockedUsers: blocked });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blocked users', error: err.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.deleted = true;
    user.deletedAt = new Date();
    await user.save();

    res.status(200).json({ message: 'Account will be permanently deleted after 7 days' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting account', error: err.message });
  }
};
