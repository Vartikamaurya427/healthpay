const { Subscription } = require('../models/Subscription');

exports.createSubscription = async (req, res) => {
  try {
    const { serviceName, amount, startDate, endDate, paymentMethod } = req.body;
    const userId = req.user.id;

    const subscription = await Subscription.create({
      userId,
      serviceName,
      amount,
      startDate,
      endDate,
      paymentMethod,
      isActive: new Date(endDate) > new Date(),
    });

    res.status(201).json({ message: "Subscription added", subscription });
  } catch (error) {
    res.status(500).json({ message: "Error adding subscription", error: error.message });
  }
};

exports.getAllSubscriptions = async (req, res) => {
  try {
    const userId = req.user.id;

    const subscriptions = await Subscription.find({ userId }).sort({ endDate: -1 });

    const currentDate = new Date();
    const categorized = {
      active: subscriptions.filter(sub => new Date(sub.endDate) > currentDate),
      expired: subscriptions.filter(sub => new Date(sub.endDate) <= currentDate),
    };

    res.json(categorized);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subscriptions", error: error.message });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;

    const deleted = await Subscription.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.json({ message: "Subscription deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subscription", error: error.message });
  }
};
