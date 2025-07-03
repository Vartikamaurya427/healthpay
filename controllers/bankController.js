const { BankAccount } = require('../models');
exports.getBanks = async (req, res) => {
  try {
    const data = await BankAccount.findAll({ where: { userId: req.user.id } });
    res.json(data);
  } catch (err) {
    console.error('💥 SQL Error:', err.parent?.sqlMessage);
    res.status(500).json({ message: 'DB error', error: err.parent?.sqlMessage });
  }
};

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
exports.deleteBank = async (req, res) => {
  const userId = req.user.id;
  const bankId = req.params.id;
  await BankAccount.destroy({ where: { id: bankId, userId } });
  res.json({ message: "Bank account removed" });
};

exports.setPrimaryBank = async (req, res) => {
  try {
    const userId = req.user.id;
    const bankId = req.params.bankId;
    await BankAccount.update({ isPrimary: false }, { where: { userId } });
    await BankAccount.update({ isPrimary: true }, { where: { id: bankId, userId } });
    res.status(200).json({ message: "Primary bank account set successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error setting primary bank", error: err.message });
  }
};
