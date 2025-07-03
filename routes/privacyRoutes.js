const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const privacyController = require('../controllers/privacyController');

// All routes are protected
router.get('/', authMiddleware, privacyController.getPrivacySettings);
router.put('/', authMiddleware, privacyController.updatePrivacySettings);
router.get('/download', authMiddleware, privacyController.downloadUserData);

router.post('/block', authMiddleware, privacyController.blockUser);
router.delete('/unblock', authMiddleware, privacyController.unblockUser);
router.get('/blocked-users', authMiddleware, privacyController.getBlockedUsers);
router.delete('/delete-account', authMiddleware, privacyController.deleteAccount)
module.exports = router;
