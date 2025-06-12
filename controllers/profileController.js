const fs = require('fs');
const path = require('path');
const User = require('../models/User');
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: ['username', 'email', 'phone', 'profileImage']
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    let profileImageUrl;
    if (user.profileImage) {
      if (user.profileImage.startsWith("http")) {
        profileImageUrl = user.profileImage;
      } else {
        profileImageUrl = `${req.protocol}://${req.get("host")}/${user.profileImage}`;
      }
    } else {
      profileImageUrl = `${req.protocol}://${req.get("host")}/storage/default.png`;
    }
   res.status(200).json({
      username: user.username || "No Name",
      email: user.email || "No Email",
      phone: user.phone || "No Phone",
      profileImage: profileImageUrl
    });

  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email, phone, dob } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let profileImage = user.profileImage;

    if (req.file) {
      if (user.profileImage && fs.existsSync(user.profileImage) && !user.profileImage.includes('default.png')) {
        fs.unlinkSync(user.profileImage);
      }
      profileImage = req.file.path.replace(/\\/g, '/');
    }
    await user.update({
      username: username || user.username,
      email: email || user.email,
      phone: phone || user.phone,
      dob: dob || user.dob,
      profileImage: profileImage,
    });

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        profileImage: `${req.protocol}://${req.get('host')}/${profileImage}`
      }
    });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

