module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'INR',
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'subscriptions'
  });

  Subscription.associate = models => {
    Subscription.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Subscription;
};
