const express = require('express');
const router = express.Router();
const txnCtrl = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');
const limit  = require('../middleware/txnHistoryLimiter');

router.post('/transactions', authMiddleware, txnCtrl.createTransaction);
router.get('/transactions', authMiddleware, limit, txnCtrl.getTransactionHistory);
router.get('/transactions/:id', authMiddleware, txnCtrl.getTransactionById);

module.exports = router;
