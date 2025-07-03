const { Reward, sequelize } = require('../models');
const { getFcmToken, sendNotification } = require('../helpers/fcmHelper');
// const {op} = require(sequelize);

exports.createReward = async (req, res) => {
  try {
    const reward = await Reward.create(req.body);
    res.status(201).json({ message: "Reward created", reward });
  } catch (err) {
    res.status(500).json({ message: "Error creating reward", error: err.message });
  }
};
exports.getRewards = async (req, res) => {
  try {
    const where = {};
    if (req.query.type) where.type = req.query.type;
    if (req.query.userId) where.userId = req.query.userId;
   const rewards = await Reward.findAll({ where });
    res.status(200).json(rewards);
  } catch (err) {
    res.status(500).json({ message: "Error fetching rewards", error: err.message });
  }
};
exports.updateReward = async (req, res) => {
  try {
    const { id } = req.params;
    await Reward.update(req.body, { where: { id } });
    res.status(200).json({ message: "Reward updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating reward", error: err.message });
  }
};
exports.deleteReward = async (req, res) => {
  try {
    const { id } = req.params;
    await Reward.destroy({ where: { id } });
    res.status(200).json({ message: "Reward deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting reward", error: err.message });
  }
};
exports.scratchCardReward = async (req, res) => {
  try {
    const userId = req.user.id;
    const amount = Math.floor(Math.random() * 50) + 1;
    const reward = await Reward.create({
      userId,
      type: "scratch_card",
      title: `You won ₹${amount}!`,
      amount,
      status: "active"
    });
    const fcmToken = await getFcmToken(userId);
    if (fcmToken) {
      await sendNotification(fcmToken, " Reward Received!", `You won ₹${amount} from scratch card`);
    }
    res.status(200).json({ message: "Scratch reward given", reward });
  } catch (err) {
    res.status(500).json({ message: "Error giving scratch reward", error: err.message });
  }
};
exports.referralReward = async (req, res) => {
  try {
    const referredUserId = req.user.id;             
    const { referrerId } = req.body;                
    if (!referrerId) {
      return res.status(400).json({ message: "Referrer ID is required" });
    }
    const reward = await Reward.create({
      userId: referrerId,
      type: "referral",
      title: `You referred a friend!`,
      amount: 20,
      status: "active",
      metaData: {
        referredUserId,
        referredAt: new Date()
      }
    });
    const fcmToken = await getFcmToken(referrerId);
    if (fcmToken) {
      await sendNotification(fcmToken,  "Referral Bonus", `You got ₹20 for referring a friend!`);
    }
  res.status(200).json({ message: "Referral reward given", reward });

  } catch (err) {
    res.status(500).json({ message: "Error giving referral reward", error: err.message });
  }
};
exports.cashbackReward = async (req, res) => {
  try {
    const userId = req.user.id;
    const amount = Math.floor(Math.random() * 30) + 5; 

    const reward = await Reward.create({
      userId,
      type: "cashback",
      title: `You received ₹${amount} cashback!`,
      amount,
      status: "active",
      metaData: {
        source: "payment_success",
        timestamp: new Date()
      }
    });
    
    const fcmToken = await getFcmToken(userId);
    if (fcmToken) {
      await sendNotification(fcmToken, " Cashback Received", `₹${amount} added to your rewards`);
    }
    res.status(200).json({ message: "Cashback reward given", reward });
  } catch (err) {
    console.error("Cashback reward error:", err);
    res.status(500).json({ message: "Error giving cashback", error: err.message });
  }
};
exports.offerReward = async (req, res) => {
  try {
    const userId = req.user.id;
    const { offerTitle, offerAmount } = req.body;
   const reward = await Reward.create({
      userId,
      type: "offer",
      title: offerTitle || " Special Offer Unlocked!",
      amount: offerAmount || 15,
      status: "active",
      metaData: {
        unlockedAt: new Date()
      }
    });
    const fcmToken = await getFcmToken(userId);
    if (fcmToken) {
      await sendNotification(fcmToken, " Offer Unlocked", reward.title);
    }
    res.status(200).json({ message: "Offer reward given", reward });
  } catch (err) {
    console.error("Offer reward error:", err);
    res.status(500).json({ message: "Error giving offer reward", error: err.message });
  }
};


exports.getRewardSummary = async (req, res) => {
  try {
const userId = req.user.id
    const rewards = await Reward.findAll({ where: { userId } });
    const totalRewards = rewards.length;
    const totalAmount = rewards.reduce((sum, r) => sum + (r.amount || 0), 0);

    const typeCounts = {};
    rewards.forEach(r => {
      typeCounts[r.type] = (typeCounts[r.type] || 0) + 1;
    });
    const latestRewards = await Reward.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 5
    });
    res.status(200).json({
      totalRewards,
      totalAmount,
      byType: typeCounts,
      latestRewards
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching summary", error: err.message });
  }
};

exports.claimReward = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
 try {
    const reward = await Reward.findOne({ where: { id, userId } });
 if (!reward) {
      return res.status(404).json({ message: "Reward not found" });
    }
if (reward.status === 'used') {
      return res.status(400).json({ message: "Reward already claimed" });
    }
reward.status = 'used';
    reward.metaData = {
      ...reward.metaData,
      claimedAt: new Date()
    };
await reward.save();
res.status(200).json({
      message: "Reward claimed successfully",
      reward
    });
    } catch (err) {
    res.status(500).json({ message: "Error claiming reward", error: err.message });
  }
};