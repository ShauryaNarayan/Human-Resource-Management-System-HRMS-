const Log = require("../models/Log");
const User = require("../models/User");

async function listLogs(req, res) {
  const logs = await Log.findAll({
    where: { organisationId: req.user.orgId },
    include: [{ model: User, attributes: ["email"] }],
    order: [["timestamp", "DESC"]],
  });

  res.json(logs);
}

module.exports = { listLogs };
