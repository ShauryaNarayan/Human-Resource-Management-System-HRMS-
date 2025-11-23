const Employee = require("../models/Employee");
const Team = require("../models/Team");
const Log = require("../models/Log");

//
// GET ALL EMPLOYEES
//
async function listEmployees(req, res) {
  const employees = await Employee.findAll({
    where: { organisationId: req.user.orgId },
    include: [Team],
  });

  res.json(employees);
}

//
// GET SINGLE EMPLOYEE
//
async function getEmployee(req, res) {
  const employee = await Employee.findOne({
    where: { id: req.params.id, organisationId: req.user.orgId },
    include: [Team],
  });

  if (!employee) return res.status(404).json({ message: "Employee not found" });

  res.json(employee);
}

//
// CREATE EMPLOYEE
//
async function createEmployee(req, res) {
  const { firstName, lastName, email, phone } = req.body;

  const employee = await Employee.create({
    firstName,
    lastName,
    email,
    phone,
    organisationId: req.user.orgId,
  });

  await Log.create({
    organisationId: req.user.orgId,
    userId: req.user.userId,
    action: "employee_created",
    meta: { employeeId: employee.id },
  });

  res.status(201).json(employee);
}

//
// UPDATE EMPLOYEE
//
async function updateEmployee(req, res) {
  const employee = await Employee.findOne({
    where: { id: req.params.id, organisationId: req.user.orgId },
  });

  if (!employee) return res.status(404).json({ message: "Employee not found" });

  const { firstName, lastName, email, phone } = req.body;

  await employee.update({ firstName, lastName, email, phone });

  await Log.create({
    organisationId: req.user.orgId,
    userId: req.user.userId,
    action: "employee_updated",
    meta: { employeeId: employee.id },
  });

  res.json(employee);
}

//
// DELETE EMPLOYEE
//
async function deleteEmployee(req, res) {
  const employee = await Employee.findOne({
    where: { id: req.params.id, organisationId: req.user.orgId },
  });

  if (!employee) return res.status(404).json({ message: "Employee not found" });

  await employee.destroy();

  await Log.create({
    organisationId: req.user.orgId,
    userId: req.user.userId,
    action: "employee_deleted",
    meta: { employeeId: employee.id },
  });

  res.json({ message: "Employee deleted" });
}

module.exports = {
  listEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
