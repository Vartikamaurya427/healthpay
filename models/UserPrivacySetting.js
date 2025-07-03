module.exports = (sequelize, DataTypes) => {
  const UserPrivacySetting = sequelize.define("UserPrivacySetting", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    permissionGiven: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    searchPrivacy: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    
  });

  return UserPrivacySetting;
};
