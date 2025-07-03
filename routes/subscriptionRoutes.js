const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const subscriptionController = require('../controllers/subscriptionController');
router.post('/subscribe', authMiddleware, subscriptionController.createSubscription);
router.get('/subscribed', authMiddleware, subscriptionController.getAllSubscriptions);
router.delete('/subscribe/:id', authMiddleware, subscriptionController.deleteSubscription);

module.exports = router;
