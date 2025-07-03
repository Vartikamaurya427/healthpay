const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');
const { scratchCardReward } = require('../controllers/rewardController');
const { referralReward, cashbackReward, } = require('../controllers/rewardController');
const authMiddleware = require('../middleware/authMiddleware');
const { offerReward } = require('../controllers/rewardController');
const { getRewardSummary } = require('../controllers/rewardController');


router.post('/scratch', authMiddleware, scratchCardReward);

router.post('/', rewardController.createReward);
router.get('/', rewardController.getRewards);
router.put('/:id', rewardController.updateReward);
router.delete('/:id', rewardController.deleteReward);

router.post('/scratch', authMiddleware, scratchCardReward);
router.post('/referral', authMiddleware, referralReward);
router.post('/cashback', authMiddleware, cashbackReward);
router.post('/offer', authMiddleware, offerReward);
router.get('/summary', authMiddleware, getRewardSummary);
router.post('/:id/claim', authMiddleware, rewardController.claimReward);


module.exports = router;
