const router = require('express').Router();
const contactCtrl = require('../contact/contact.controller');
const authenticate = require('../middleware/authMiddleware'); // JWT verify

router.use(authenticate);  // Protect all routes below

// GET /api/contacts?q=search&favorite=true/false&limit=30&offset=0
router.get('/', contactCtrl.getContacts);

// PATCH /api/contacts/:id/favorite
router.patch('/:id/favorite', contactCtrl.toggleFavorite);

module.exports = router;
