const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Organisation = require("../models/Organisation");
const User = require("../models/User");
const Log = require("../models/Log");

//
// REGISTER → Create organisation + admin user
//
async function register(req, res) {
  try {
    const { orgName, adminName, email, password } = req.body;

    if (!orgName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const organisation = await Organisation.create({ name: orgName });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: adminName,
      email,
      passwordHash: hashed,
      organisationId: organisation.id,
    });

    const token = jwt.sign(
      { userId: user.id, orgId: organisation.id },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    await Log.create({
      organisationId: organisation.id,
      userId: user.id,
      action: "organisation_created",
      meta: { organisationId: organisation.id, orgName },
    });

    res.status(201).json({
      message: "Organisation & Admin created successfully",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

//
// LOGIN
//
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { userId: user.id, orgId: user.organisationId },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    await Log.create({
      organisationId: user.organisationId,
      userId: user.id,
      action: "user_logged_in",
      meta: { email: user.email },
    });

    res.json({
      message: "Logged in successfully",
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { register, login };
