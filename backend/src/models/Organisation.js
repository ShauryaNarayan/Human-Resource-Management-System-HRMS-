const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Organisation = sequelize.define('Organisation', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Organisation;
