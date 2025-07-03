module.exports = (sequelize, DataTypes) => {
  const FcmToken = sequelize.define('FcmToken', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return FcmToken;
};
