const { User } = require('../models/User');

exports.getReviewSummary = async (req, res) => {
  try {
    const { recipientId, amount, paymentType, note = '' } = req.body;

    // 1️⃣ Basic validation
    if (!recipientId || !amount || !paymentType) {
      return res.status(400).json({ message: 'recipientId, amount, paymentType required' });
    }

    // 2️⃣ Fetch recipient by _id
    const recipient = await User.findById(recipientId)
      .select('id username email profileImage');

    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    // 3️⃣ Calculate extra charges (example: 7% GST on goods/services)
    const tax = paymentType === 'goods_services' ? +(amount * 0.07).toFixed(2) : 0;
    const total = +(Number(amount) + tax).toFixed(2);

    // 4️⃣ Send review summary
    res.status(200).json({
      recipient,
      amount: +amount,
      tax,
      total,
      paymentType,
      note
    });
  } catch (err) {
    res.status(500).json({ message: 'Error generating review summary', error: err.message });
  }
};
