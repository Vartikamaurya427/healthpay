const fs = require('fs');
const path = require('path');
const { User } = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("id name email phone address profileImage");

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
      name: user.name || "No Name",
      email: user.email || "No Email",
      phone: user.phone || "No Phone",
      adress: user.address || "No Address",
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
    const { name, email, phone, address } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let profileImage = user.profileImage;

    if (req.file) {
      if (
        user.profileImage &&
        fs.existsSync(user.profileImage) &&
        !user.profileImage.includes("default.png")
      ) {
        fs.unlinkSync(user.profileImage);
      }

      profileImage = req.file.path.replace(/\\/g, "/");
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.profileImage = profileImage;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        profileImage: `${req.protocol}://${req.get("host")}/${profileImage}`
      }
    });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
