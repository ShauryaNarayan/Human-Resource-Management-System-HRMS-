const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Organisation = require('./Organisation');

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Associations
Organisation.hasMany(User, { foreignKey: 'organisationId' });
User.belongsTo(Organisation, { foreignKey: 'organisationId' });

module.exports = User;
