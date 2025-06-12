const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    profileImage: {
    type: DataTypes.STRING,
    defaultValue: "", 
  },
  dob: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
