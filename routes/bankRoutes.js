const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const bankController = require('../controllers/bankController');

router.get('/bank', authMiddleware, bankController.getBanks);
router.post('/bank', authMiddleware, bankController.addBank);
router.delete('/:id', authMiddleware, bankController.deleteBank);
router.patch('/set-primary/:bankId', authMiddleware,bankController.setPrimaryBank);

module.exports = router;
