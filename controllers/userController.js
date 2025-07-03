const {User} = require('../models');

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const generatePassword = require("../helpers/random")
const { Op } = require("sequelize");   
const { addToken } = require("../helpers/blacklist");
const { LoginActivity } = require('../models');


exports.register = async (req, res) => {
  const { username, email, phone } = req.body;
  
  if (!username || !email || !phone) {
    return res.status(400).json({ error: "All fields required" });
  }
 
  try {
    const existingUserByEmail = await User.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res.status(409).json({ error: "Email already registered" });
    }
    
    const existingUserByPhone = await User.findOne({ where: { phone } });
    if (existingUserByPhone) {
      return res.status(409).json({ error: "Phone number already registered" });
    }
    
    // Generate and hash password
    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phone
    });
    
    // Return success response
    return res.status(201).json({ 
      message: "User registered (password sent to the email)", 
      userId: user.id,
      password: password // Note: Typically you wouldn't return the password in the response
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
exports.login = async (req, res) => {
  const { emailphone, password } = req.body;

  try {
    if (!emailphone || !password) {
      return res.status(400).json({ message: "Email/Phone and password are required" });
    }

    // Find user with either email OR phone
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: emailphone },
          { phone: emailphone }
        ]
      }
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
 try {
  await LoginActivity.create({
    userId: user.id,
    device: req.headers['user-agent'],
    ipAddress: req.ip || req.connection.remoteAddress,
    location: 'Unknown'
  });
} catch (err) {
  console.log("Login activity failed:", err.message);
}

    const { password: _, ...userWithoutPassword } = user.toJSON();

    res.json({ message: "Login successful", token, user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

exports.logout = async (req, res) => {
  const token = req.token;

  if (token) {
    addToken(token);
    return res.json({ message: "Logged out successfully" });
  } else {
    return res.status(400).json({ message: "Token missing" });
  }
};



