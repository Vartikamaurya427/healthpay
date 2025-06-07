const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  const { username, email, password, confirmPassword, phone } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  if (!username || !email || !password || !confirmPassword || !phone) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User registered", userId: user.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ message: "Login successful", token, userId: user.id });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
