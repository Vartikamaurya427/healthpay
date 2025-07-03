module.exports = (sequelize, DataTypes) => {
  const Reward = sequelize.define('Reward', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('scratch_card', 'cashback', 'referral', 'offer'),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('active', 'used', 'expired'),
      defaultValue: 'active'
    },
    metaData: {
  type: DataTypes.JSON,
  allowNull: true
}

  });

  return Reward;
};
