const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generate6DigitOtp } = require("../helpers/otp");
const { sendSMS } = require("../utils/sms");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/User"); // ✅ Mongoose model
const { FcmToken } = require("../models/FcmToken"); // ✅ Mongoose model

exports.sendOtp = async (req, res) => {
  const { phone, channel } = req.body;

  if (!phone) return res.status(400).json({ error: "Phone required" });

  let user = await User.findOne({ phone });
  if (!user) user = await User.create({ phone });

  const otp = generate6DigitOtp();
  const otpHash = await bcrypt.hash(otp, 10);
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  user.otpHash = otpHash;
  user.otpExpires = expiry;
  await user.save();

  channel === "whatsapp"
    ? await sendWhatsApp(phone, `Your OTP: ${otp}`)
    : await sendSMS(phone, `Your OTP: ${otp}`);

  res.json({ message: `OTP sent via ${channel}` });
};

exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  const user = await User.findOne({ phone });

  if (!user || !user.otpHash) return res.status(400).json({ error: "OTP expired" });

  const isMatch = await bcrypt.compare(otp, user.otpHash);
  if (!isMatch) return res.status(400).json({ error: "Invalid OTP" });

  user.isVerified = true;
  user.otpHash = null;
  user.otpExpires = null;
  await user.save();

  const token = jwt.sign({ id: user._id, pinSet: !!user.pinHash }, process.env.JWT_SECRET, { expiresIn: "15m" });
  res.json({ tempToken: token, pinSet: !!user.pinHash });
};

exports.setPin = async (req, res) => {
  try {
    const userId = req.user.id;
    const { pin } = req.body;

    if (!pin) {
      return res.status(400).json({ message: "PIN is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const pinHash = await bcrypt.hash(String(pin), 10);
    user.pinHash = pinHash;
    await user.save();

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "PIN set successfully", token });
  } catch (err) {
    console.error("Set PIN Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.loginPin = async (req, res) => {
  const { phone, pin } = req.body;

  if (!phone || !pin) {
    return res.status(400).json({ error: "Phone and PIN are required" });
  }

  const user = await User.findOne({ phone });

  if (!user || !user.pinHash) {
    return res.status(400).json({ error: "User not found or PIN not set" });
  }

  const ok = await bcrypt.compare(pin, user.pinHash);
  if (!ok) {
    return res.status(400).json({ error: "Wrong PIN" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
};

exports.changePin = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPin, newPin } = req.body;

    if (!oldPin || !newPin) {
      return res.status(400).json({ error: "Both oldPin and newPin are required" });
    }

    const user = await User.findById(userId);
    if (!user || !user.pinHash) {
      return res.status(404).json({ error: "User not found or PIN not set" });
    }

    const isMatch = await bcrypt.compare(oldPin, user.pinHash);
    if (!isMatch) {
      return res.status(400).json({ error: "Old PIN is incorrect" });
    }

    const newPinHash = await bcrypt.hash(newPin, 10);
    user.pinHash = newPinHash;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "PIN changed successfully", token });
  } catch (err) {
    console.error("Change PIN error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    const userId = req.user.id;

    await FcmToken.deleteMany({ userId });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Server error during logout" });
  }
};
