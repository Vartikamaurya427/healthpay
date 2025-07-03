module.exports = (sequelize, DataTypes) => {
  const BankAccount = sequelize.define('BankAccount', {

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ifscCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isPrimary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  BankAccount.associate = (models) => {
    BankAccount.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return BankAccount;
};