const Team = require("../models/Team");
const Employee = require("../models/Employee");
const EmployeeTeam = require("../models/EmployeeTeam");
const Log = require("../models/Log");

//
// GET ALL TEAMS
//
async function listTeams(req, res) {
  const teams = await Team.findAll({
    where: { organisationId: req.user.orgId },
    include: [Employee],
  });

  res.json(teams);
}

//
// GET TEAM BY ID
//
async function getTeamById(req, res) {
  const team = await Team.findOne({
    where: { id: req.params.id, organisationId: req.user.orgId },
    include: [Employee],
  });

  if (!team) {
    return res.status(404).json({ message: "Team not found" });
  }

  res.json(team);
}

//
// CREATE TEAM
//
async function createTeam(req, res) {
  const { name, description } = req.body;

  const team = await Team.create({
    name,
    description,
    organisationId: req.user.orgId,
  });

  await Log.create({
    organisationId: req.user.orgId,
    userId: req.user.userId,
    action: "team_created",
    meta: { teamId: team.id },
  });

  res.status(201).json(team);
}

//
// UPDATE TEAM
//
async function updateTeam(req, res) {
  const team = await Team.findOne({
    where: { id: req.params.id, organisationId: req.user.orgId },
  });

  if (!team) return res.status(404).json({ message: "Team not found" });

  const { name, description } = req.body;

  await team.update({ name, description });

  await Log.create({
    organisationId: req.user.orgId,
    userId: req.user.userId,
    action: "team_updated",
    meta: { teamId: team.id },
  });

  res.json(team);
}

//
// DELETE TEAM
//
async function deleteTeam(req, res) {
  const team = await Team.findOne({
    where: { id: req.params.id, organisationId: req.user.orgId },
  });

  if (!team) return res.status(404).json({ message: "Team not found" });

  await team.destroy();

  await Log.create({
    organisationId: req.user.orgId,
    userId: req.user.userId,
    action: "team_deleted",
    meta: { teamId: req.params.id },
  });

  res.json({ message: "Team deleted" });
}

//
// ASSIGN EMPLOYEE TO TEAM
//
async function assignEmployee(req, res) {
  const { teamId } = req.params;
  const { employeeId } = req.body;

  // Check team exists & belongs to org
  const team = await Team.findOne({
    where: { id: teamId, organisationId: req.user.orgId },
  });

  if (!team) return res.status(404).json({ message: "Team not found" });

  // Check employee exists & belongs to org
  const employee = await Employee.findOne({
    where: { id: employeeId, organisationId: req.user.orgId },
  });

  if (!employee) return res.status(404).json({ message: "Employee not found" });

  // Create assignment
  await EmployeeTeam.findOrCreate({
    where: { teamId, employeeId },
  });

  await Log.create({
    organisationId: req.user.orgId,
    userId: req.user.userId,
    action: "employee_assigned_to_team",
    meta: { teamId, employeeId },
  });

  res.json({ message: "Employee assigned" });
}

//
// UNASSIGN EMPLOYEE FROM TEAM
//
async function unassignEmployee(req, res) {
  const { teamId } = req.params;
  const { employeeId } = req.body;

  // Check assignment exists
  const assignment = await EmployeeTeam.findOne({
    where: { teamId, employeeId },
  });

  if (!assignment)
    return res.status(404).json({ message: "Assignment not found" });

  await assignment.destroy();

  await Log.create({
    organisationId: req.user.orgId,
    userId: req.user.userId,
    action: "employee_unassigned_from_team",
    meta: { teamId, employeeId },
  });

  res.json({ message: "Employee unassigned" });
}

module.exports = {
  listTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
  assignEmployee,
  unassignEmployee,
};
