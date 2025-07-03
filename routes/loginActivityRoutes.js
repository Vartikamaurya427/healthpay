const express = require('express');
const router = express.Router();
const loginActivityController = require('../controllers/loginActivityController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/login-activity', authMiddleware, loginActivityController.getLoginActivity);

module.exports = router;
