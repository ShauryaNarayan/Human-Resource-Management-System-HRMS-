const bcrypt = require("bcrypt");
const Organisation = require("./models/Organisation");
const User = require("./models/User");
const Employee = require("./models/Employee");
const Team = require("./models/Team");
const EmployeeTeam = require("./models/EmployeeTeam");
const Log = require("./models/Log");
const { sequelize } = require("./db");

async function seed() {
  try {
    console.log("🌱 Starting seed...");

    await sequelize.sync({ force: true });
    console.log("✔ Database synced");

    // ----------------------------------------------------
    // 1. ORGANISATION
    // ----------------------------------------------------
    const org = await Organisation.create({ name: "Demo Organisation" });

    // ----------------------------------------------------
    // 2. ADMIN USER
    // ----------------------------------------------------
    const adminPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      passwordHash: adminPassword,
      organisationId: org.id,
    });

    // ----------------------------------------------------
    // 3. EMPLOYEES
    // ----------------------------------------------------
    const employees = await Employee.bulkCreate([
      {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "9876543210",
        organisationId: org.id,
      },
      {
        firstName: "Sarah",
        lastName: "Smith",
        email: "sarah@example.com",
        phone: "9123456780",
        organisationId: org.id,
      },
      {
        firstName: "Kevin",
        lastName: "Brown",
        email: "kevin@example.com",
        phone: "9988776655",
        organisationId: org.id,
      },
    ]);

    // ----------------------------------------------------
    // 4. TEAMS
    // ----------------------------------------------------
    const teams = await Team.bulkCreate([
      { name: "Engineering", description: "Tech team", organisationId: org.id },
      { name: "HR", description: "People team", organisationId: org.id },
      { name: "Finance", description: "Money team", organisationId: org.id },
    ]);

    // ----------------------------------------------------
    // 5. ASSIGN EMPLOYEES TO TEAMS
    // ----------------------------------------------------
    await EmployeeTeam.bulkCreate([
      { employeeId: employees[0].id, teamId: teams[0].id },
      { employeeId: employees[1].id, teamId: teams[1].id },
      { employeeId: employees[2].id, teamId: teams[2].id },
    ]);

    // ----------------------------------------------------
    // 6. SAMPLE LOGS
    // ----------------------------------------------------
    await Log.create({
      organisationId: org.id,
      userId: admin.id,
      action: "seed_initialised",
      meta: { message: "Seed script executed successfully" },
    });

    console.log("🎉 Seed completed successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();
