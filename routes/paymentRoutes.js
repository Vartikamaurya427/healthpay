const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const paymentCtrl = require('../controllers/paymentController');

// Review summary (4th screen)
router.post('/payments/review-summary', authMiddleware, paymentCtrl.getReviewSummary);

module.exports = router;
