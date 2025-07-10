const User = require('../models/User'); // Mongoose User model
const bcrypt = require('bcryptjs');
const { generate6DigitOtp } = require("../helpers/otp");
const { sendOtpToPhone } = require("../helpers/otp");
const jwt = require("jsonwebtoken");

// ⏳ 1. Send OTP to phone (for forgot PIN)
exports.forgotPinSendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "Phone number required" });

  const user = await User.findOne({ phone });
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = generate6DigitOtp();
  const otpHash = await bcrypt.hash(otp, 10);
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 mins from now

  user.otpHash = otpHash;
  user.otpExpires = otpExpires;
  await user.save();

  await sendOtpToPhone(phone, otp); // helper
  res.json({ message: "OTP sent to your phone" });
};

// ✅ 2. Verify OTP
exports.forgotPinVerifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  const user = await User.findOne({ phone });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isValid = await bcrypt.compare(otp, user.otpHash);
  const notExpired = new Date(user.otpExpires) > new Date();

  if (!isValid || !notExpired) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  const token = jwt.sign(
    { id: user._id, pinReset: true },
    process.env.JWT_SECRET,
    { expiresIn: "10m" }
  );

  res.json({ message: "OTP verified", token });
};

// 🔒 3. Set new PIN after OTP
exports.setNewPinAfterOtp = async (req, res) => {
  const userId = req.user.id;
  const { pin } = req.body;

  if (!pin) return res.status(400).json({ message: "New PIN required" });

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.pinHash = await bcrypt.hash(pin, 10);
  await user.save();

  const fullToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ message: "PIN set successfully", token: fullToken });
};
