const { User } = require('../models');
exports.updateLanguage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { language } = req.body;
    if (!language) {
      return res.status(400).json({ message: 'Language is required' });
    }
    await User.update({ language }, { where: { id: userId } });
    res.status(200).json({ message: 'Language updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating language', error: err.message });
  }
};
exports.getLanguage = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ language: user.language });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching language', error: err.message });
  }
};
