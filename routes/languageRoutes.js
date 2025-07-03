const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languageController');
const authMiddleware = require('../middleware/authMiddleware');

router.put('/', authMiddleware, languageController.updateLanguage);
router.get('/', authMiddleware, languageController.getLanguage);

module.exports = router;
