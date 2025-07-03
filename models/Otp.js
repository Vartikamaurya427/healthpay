// models/Otp.js
module.exports = (sequelize, DataTypes) => {
  const Otp = sequelize.define('Otp', {
    identifier: {
      type: DataTypes.STRING,
      allowNull: false
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Otp;
};
