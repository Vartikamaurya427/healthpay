const express = require('express');
const router = express.Router();
const authController = require('./authController');
const authMiddleware = require('../middleware/authMiddleware');

// Forget Password Routes
router.post('/forgot-password', authMiddleware, authController.forgotPassword);
router.post('/verify-otp', authMiddleware, authController.verifyOtp);
router.post('/reset-password', authMiddleware, authController.resetPassword);

module.exports = router;
