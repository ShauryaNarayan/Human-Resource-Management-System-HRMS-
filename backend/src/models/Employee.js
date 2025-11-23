const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Organisation = require('./Organisation');

const Employee = sequelize.define('Employee', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING
});

// Org relationship
Organisation.hasMany(Employee, { foreignKey: 'organisationId' });
Employee.belongsTo(Organisation, { foreignKey: 'organisationId' });

module.exports = Employee;
