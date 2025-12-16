const { getUsersService } = require("../services/user.service.js");

// Handles HTTP concerns only

function getUsersController(req, res) {
  const [users] = getUsersService();

  if (!users.name) {
    throw new Error("The name is required.");
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ data: users }));
}

module.exports = { getUsersController };
