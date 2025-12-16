const {
  getUsersService,
  createUserService,
} = require("../services/user.service.js");

const { parseJsonBody } = require("../utils/body-parser.js");

const { handleError } = require("../utils/error-handler.js");

// Handles HTTP concerns only

// GET /users
function getUsersController(req, res) {
  try {
    const users = getUsersService();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ data: users }));
  } catch (error) {
    handleError(error, res);
  }
}

// POST /users
async function createUserController(req, res) {
  try {
    const body = await parseJsonBody(req);

    const user = createUserService(body);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ data: user }));
  } catch (error) {
    handleError(error, res);
  }
}

module.exports = { getUsersController, createUserController };
