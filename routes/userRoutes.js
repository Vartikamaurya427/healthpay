const express = require('express');
const router = express.Router();
const {
  sendOtp,
  verifyOtp,
  setPin,
  loginPin,
  changePin,
  logout
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const { getProfile, updateProfile } = require('../controllers/profileController');
const upload = require('../helpers/multer');
const { saveFcmToken, getFcmTokenByUserId } = require("../controllers/fcmController");

// OTP & PIN Routes
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/set-pin", authMiddleware, setPin);
router.post("/login-pin", loginPin);
router.post("/change-pin", authMiddleware, changePin);
router.post("/logout", authMiddleware, logout);

// Profile & Dashboard
router.get("/dashboard", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Welcome to your dashboard!" });
});
router.get("/profile", authMiddleware, getProfile);
router.post("/profile", authMiddleware, upload.single('profileImage'), updateProfile);

// FCM Token
router.post("/fcm-token", saveFcmToken);
router.get("/get-token/:userId", getFcmTokenByUserId);

// Future:
// router.post("/change-password", authMiddleware, changePassword);

module.exports = router;
