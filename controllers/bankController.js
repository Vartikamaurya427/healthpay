const { BankAccount } = require('../models/BankAccount');

// GET all bank accounts of a user
exports.getBanks = async (req, res) => {
  try {
    const data = await BankAccount.find({ userId: req.user.id });
    res.json(data);
  } catch (err) {
    console.error('💥 MongoDB Error:', err.message);
    res.status(500).json({ message: 'DB error', error: err.message });
  }
};

// POST add new bank account
exports.addBank = async (req, res) => {
  const userId = req.user.id;
  const { bankName, accountNumber, ifscCode } = req.body;
  
  const newBank = await BankAccount.create({
    userId,
    bankName,
    accountNumber,
    ifscCode
  });

  res.status(201).json({ message: "Bank account added", data: newBank });
};

// DELETE bank account
exports.deleteBank = async (req, res) => {
  const userId = req.user.id;
  const bankId = req.params.id;

  await BankAccount.deleteOne({ _id: bankId, userId });
  res.json({ message: "Bank account removed" });
};

// PATCH set primary bank
exports.setPrimaryBank = async (req, res) => {
  try {
    const userId = req.user.id;
    const bankId = req.params.bankId;

    // Step 1: Unset all other primary
    await BankAccount.updateMany({ userId }, { isPrimary: false });

    // Step 2: Set selected as primary
    await BankAccount.findOneAndUpdate(
      { _id: bankId, userId },
      { isPrimary: true }
    );

    res.status(200).json({ message: "Primary bank account set successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error setting primary bank", error: err.message });
  }
};
