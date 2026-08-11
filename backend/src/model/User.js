const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
  'User',
  {
    login: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    tableName: 'usuarios'
  }
);

module.exports = User;