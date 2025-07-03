// middleware/txnHistoryLimiter.js
const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 60 * 1000,   // 1 min
  max: 30,
  keyGenerator: (req) => {
    return req.user?.id?.toString() || req.ip;  // fallback to IP
  },
  message: { message: 'Too many requests, slow down.' }
});
