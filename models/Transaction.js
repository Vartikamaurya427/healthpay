module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    fromUserId:  { type: DataTypes.INTEGER, allowNull: false },
    toUserEmail: { type: DataTypes.STRING,  allowNull: false },
    amount:      { type: DataTypes.FLOAT,   allowNull: false },
    type:        { type: DataTypes.ENUM('send','receive','topup','request'), allowNull: false },
    status:      { type: DataTypes.ENUM('pending','success','failed'), defaultValue: 'pending' },
    transactionId: DataTypes.STRING,
    referenceId:   DataTypes.STRING,
    note:          DataTypes.STRING
  }, {
    tableName: 'Transactions'
  });
  return Transaction;
};
