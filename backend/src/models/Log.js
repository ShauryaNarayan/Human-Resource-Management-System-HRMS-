const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Organisation = require('./Organisation');
const User = require('./User');

const Log = sequelize.define('Log', {
  action: {
    type: DataTypes.STRING,
    allowNull: false
  },
  meta: {
    type: DataTypes.JSONB,  // Postgres feature
    allowNull: true
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Organisation relationship
Organisation.hasMany(Log, { foreignKey: 'organisationId' });
Log.belongsTo(Organisation, { foreignKey: 'organisationId' });

// User relationship
User.hasMany(Log, { foreignKey: 'userId' });
Log.belongsTo(User, { foreignKey: 'userId' });

module.exports = Log;
