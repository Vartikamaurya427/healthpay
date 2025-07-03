module.exports = (sequelize, DataTypes) => {
  const BlockedUser = sequelize.define('BlockedUser', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    blockedUserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return BlockedUser;
};
