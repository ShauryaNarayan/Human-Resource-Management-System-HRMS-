const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Organisation = require('./Organisation');

const Team = sequelize.define('Team', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT
});

// Org relationship
Organisation.hasMany(Team, { foreignKey: 'organisationId' });
Team.belongsTo(Organisation, { foreignKey: 'organisationId' });

module.exports = Team;
