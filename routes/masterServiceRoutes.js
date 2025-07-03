const router = require('express').Router();
const controller = require('../controllers/masterServiceController');

router.post('/', controller.createService);            // Admin only
router.get('/', controller.getAllServices);            // Public
router.get('/search', controller.searchServices);      // Public search

module.exports = router;
