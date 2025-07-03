const { User, Otp } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const sendOtp = require('../helpers/sendOtp');

exports.forgotPassword = async (req, res) => {
  const { identifier } = req.body;

  const user = await User.findOne({
    where: { [Op.or]: [{ email: identifier }, { phone: identifier }] }
  });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log('DEV OTP:', otp); // sirf dev me

  const hashedOtp = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

  await Otp.create({ identifier, otp: hashedOtp, expiresAt });

  await sendOtp(identifier, otp); // email ya SMS se bhejna
  res.json({ message: 'OTP sent successfully' });
};
exports.verifyOtp = async (req, res) => {
  const { identifier, otp } = req.body;

  const record = await Otp.findOne({
    where: {
      identifier,
      verified: false,
      expiresAt: { [Op.gt]: new Date() }
    },
    order: [['createdAt', 'DESC']]
  });

  if (!record) return res.status(400).json({ message: 'Invalid or expired OTP' });

  const isMatch = await bcrypt.compare(otp, record.otp);
  if (!isMatch) return res.status(400).json({ message: 'Invalid OTP' });

  record.verified = true;
  await record.save();

  res.json({ message: 'OTP verified successfully' });
};
exports.resetPassword = async (req, res) => {
  const { identifier, newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword)
    return res.status(400).json({ message: 'Both password fields are required' });

  if (newPassword !== confirmPassword)
    return res.status(400).json({ message: 'Passwords do not match' });

  const lastOtp = await Otp.findOne({
    where: { identifier, verified: true },
    order: [['updatedAt', 'DESC']]
  });

  if (!lastOtp) return res.status(400).json({ message: 'OTP not verified' });

  const hashed = await bcrypt.hash(newPassword, 10);

  await User.update({ password: hashed }, {
    where: { [Op.or]: [{ email: identifier }, { phone: identifier }] }
  });

  lastOtp.verified = false; // invalidate used OTP
  await lastOtp.save();

  res.json({ message: 'Password reset successful' });
};
