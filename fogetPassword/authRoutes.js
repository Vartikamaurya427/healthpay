const express = require('express');
const router = express.Router();
const authController = require('./authController');
const authMiddleware = require('../middleware/authMiddleware');

// Forget PIN Routes
router.post("/forgot-pin/request-otp", authController.forgotPinSendOtp);
router.post("/forgot-pin/verify-otp", authController.forgotPinVerifyOtp);
router.post("/forgot-pin/set-new", authMiddleware, authController.setNewPinAfterOtp);

module.exports = router;
