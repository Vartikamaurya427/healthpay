module.exports = (sequelize, DataTypes) => {
  const LoginActivity = sequelize.define('LoginActivity', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    device: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    loggedInAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  LoginActivity.associate = (models) => {
    LoginActivity.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return LoginActivity;
};
