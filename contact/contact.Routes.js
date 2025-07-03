const router = require('express').Router();
const contactCtrl = require('../contact/contact.controller');
const authenticate = require('../middleware/authMiddleware'); // JWT verify

router.use(authenticate);                       // protected

router.get('/',  contactCtrl.getContacts);      // GET /api/contacts
router.patch('/:id/favorite', contactCtrl.toggleFavorite);   // PATCH /api/contacts/7/favorite

module.exports = router;
