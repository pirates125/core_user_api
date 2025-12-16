const {
  getUsersService,
  createUserService,
} = require("../services/user.service.js");

const { parseJsonBody } = require("../utils/body-parser.js");

// Handles HTTP concerns only

// GET /users
function getUsersController(req, res) {
  const users = getUsersService();

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ data: users }));
}

// POST /users
async function createUserController(req, res) {
  try {
    const body = await parseJsonBody(req);

    const user = createUserService(body);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ data: user }));
  } catch (error) {
    res.writeHead(error.statusCode || 500, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify({ message: error.message }));
  }
}

module.exports = { getUsersController, createUserController };
