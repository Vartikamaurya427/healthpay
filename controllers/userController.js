const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const generatePassword = require("../helpers/random")
const { Op } = require("sequelize");   
const { addToken } = require("../helpers/blacklist");

exports.register = async (req, res) => {
  const { username, email, phone } = req.body;
  
  if (!username || !email || !phone) {
    return res.status(400).json({ error: "All fields required" });
  }
 
  try {
    // Check if email already exists
    const existingUserByEmail = await User.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res.status(409).json({ error: "Email already registered" });
    }
    
    // Check if phone number already exists
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


// exports.login = async (req, res) => {
//   const { phone, email, password } = req.body;

//   try {
//     let user;

//     // ✅ Check if phone is provided
//     if (phone) {
//       user = await User.findOne({ where: { phone } });
//     } else if (email) {
//       user = await User.findOne({ where: { email } });
//     } else {
//       return res.status(400).json({ message: "Phone or Email is required" });
//     }

//     // ❌ If user not found
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // ✅ Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//     // ✅ Create JWT Token
//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

//     // ✅ Return user data (without password)
//     const { password: _, ...userWithoutPassword } = user.toJSON();

//     res.json({ message: "Login successful", token, user: userWithoutPassword });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };
