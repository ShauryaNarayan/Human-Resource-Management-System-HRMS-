require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./db');

const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const teamRoutes = require('./routes/teams');
const logRoutes = require('./routes/logs');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/logs', logRoutes);

const PORT = 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");

    await sequelize.sync(); // creates tables automatically for assignment
    console.log("Tables synced.");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Startup error:", err);
  }
})();
