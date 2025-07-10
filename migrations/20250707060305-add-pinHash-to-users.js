// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      phone:       { type: DataTypes.STRING(15), allowNull: false, unique: true },
      isVerified:  { type: DataTypes.BOOLEAN, defaultValue: false },

      /* OTP */
      otpHash:     { type: DataTypes.STRING(60), allowNull: true,   field: "pinhash"},
      otpExpires:  { type: DataTypes.DATE,        allowNull: true },

      /* 4‑ या 6‑digit app‑PIN (bcrypt‑hashed) */
      pinHash:     { type: DataTypes.STRING(60), allowNull: true },

      /* Optional profile fields */
      name:        { type: DataTypes.STRING, allowNull: true },
      email:       { type: DataTypes.STRING, allowNull: true, unique: true },
      address:     { type: DataTypes.STRING, allowNull: true },
      profileImage:{ type: DataTypes.STRING, allowNull: true },
    },
    { tableName: "Users", timestamps: true }
  );
  return User;
};
