const {
  getUserService,
  createUserService,
  getAllUsersService,
  updateUserService,
  deleteUserService,
} = require("../services/user.service.js");

const { parseJsonBody } = require("../utils/body-parser.js");

const { handleError } = require("../utils/error-handler.js");

const { HttpError } = require("../errors/http-error.js");

// Handles HTTP concerns only

// GET /users
async function getAllUsersController(req, res) {
  try {
    const users = await getAllUsersService();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ data: users }));
  } catch (error) {
    handleError(error, res);
  }
}

// GET /users/:id
async function getUserController(req, res, id) {
  try {
    const user = await getUserService(id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ data: user }));
  } catch (error) {
    handleError(error, res);
  }
}

// POST /users
async function createUserController(req, res) {
  try {
    const body = await parseJsonBody(req);

    const user = await createUserService(body);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ data: user }));
  } catch (error) {
    handleError(error, res);
  }
}

// PATCH /users/:id
async function updateUserController(req, res, id) {
  try {
    const body = await parseJsonBody(req);
    const user = await updateUserService(id, body);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ data: user }));
  } catch (error) {
    handleError(error, res);
  }
}

// DELETE /users/:id
async function deleteUserController(req, res, id) {
  try {
    await deleteUserService(id);

    res.writeHead(204);
    res.end();
  } catch (error) {
    handleError(error, res);
  }
}

module.exports = {
  getUserController,
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
};
