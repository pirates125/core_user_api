const {
  getUsersService,
  createUserService,
  updateUserService,
} = require("../services/user.service.js");

const { parseJsonBody } = require("../utils/body-parser.js");

const { handleError } = require("../utils/error-handler.js");

const { HttpError } = require("../errors/http-error.js");

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

// PATCH /users/{id}

async function updateUserController(req, res, id) {
  try {
    const body = await parseJsonBody(req);

    // Request-level validation
    if (!id) {
      throw new HttpError(400, "id param is required");
    }

    if (!body.id || body.id !== id) {
      throw new HttpError(400, "body id must match route id");
    }

    const updatedUser = updateUserService(id, {
      name: body.name,
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ data: updatedUser }));
  } catch (error) {
    handleError(error, res);
  }
}

module.exports = {
  getUsersController,
  createUserController,
  updateUserController,
};
