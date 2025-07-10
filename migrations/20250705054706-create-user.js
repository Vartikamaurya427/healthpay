"use strict";
module.exports = {
  up: async (qi, S) => {
    await qi.createTable("Users", {
      id        : { type: S.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      phone     : { type: S.STRING(15), allowNull: false, unique: true },
      isVerified: { type: S.BOOLEAN, defaultValue: false },

      // OTP
      otpHash   : { type: S.STRING(60) },
      otpExpires: { type: S.DATE },

      createdAt : { type: S.DATE, allowNull: false },
      updatedAt : { type: S.DATE, allowNull: false }
    });
  },
  down: async (qi) => qi.dropTable("Users")
};
