const { Transaction } = require('../models');
exports.createTransaction = async (req, res) => {
  try {
    const { toUserEmail, amount, type, note } = req.body;
    const fromUserId = req.user.id;
    if (!toUserEmail || !amount || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const transaction = await Transaction.create({
      fromUserId,
      toUserEmail,
      amount,
      type,
      status: "success", // default as success for now
      transactionId: "TXN" + Date.now(),
      referenceId: "REF" + Math.floor(Math.random() * 1000000),
      note,
    });

    res.status(201).json({ message: "Transaction completed", transaction });
  } catch (err) {
    res.status(500).json({ message: "Error creating transaction", error: err.message });
  }
};
exports.getTransactionHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, limit = 20, after } = req.query;   // ← after = ISO date or txn id

    const where = { fromUserId: userId };
    if (type)   where.type = type;
    if (after)  where.createdAt = { [Op.lt]: new Date(after) }; // records older than 'after'

    const rows = await Transaction.findAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: +limit
    });

    // nextCursor = last row's createdAt (if more data)
    const nextCursor = rows.length
      ? rows[rows.length - 1].createdAt.toISOString()
      : null;

    res.json({ transactions: rows, nextCursor });
  } catch (err) {
    res.status(500).json({ message: 'Error history', error: err.message });
  }
};
exports.getTransactionById = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const userId = req.user.id;
    const transaction = await Transaction.findOne({
      where: { id: transactionId, fromUserId: userId }
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
        res.status(200).json({ transaction });
  } catch (err) {
    res.status(500).json({ message: "Error fetching transaction", error: err.message });
  }
};
