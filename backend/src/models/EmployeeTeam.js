const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Employee = require('./Employee');
const Team = require('./Team');

const EmployeeTeam = sequelize.define('EmployeeTeam', {
  assignedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Many-to-Many association
Employee.belongsToMany(Team, { through: EmployeeTeam, foreignKey: 'employeeId' });
Team.belongsToMany(Employee, { through: EmployeeTeam, foreignKey: 'teamId' });

module.exports = EmployeeTeam;
