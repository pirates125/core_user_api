const { healthController } = require("../controllers/health.controller.js");
const {
  getUsersController,
  createUserController,
  updateUserController,
} = require("../controllers/user.controller.js");

const { authMiddleware } = require("../middlewares/auth.middleware");

// Central router function
// Decides which controller will handle the request

function router(req, res) {
  // As the router gets larger, it will be broken down into parts.

  if (req.url == "/health" && req.method == "GET") {
    return healthController(req, res);
  }

  if (req.url.startsWith("/users")) {
    authMiddleware(req);
  }

  if (req.url == "/users" && req.method == "GET") {
    return getUsersController(req, res);
  }

  if (req.url == "/users" && req.method == "POST") {
    return createUserController(req, res);
  }

  let id = +req.url.split("/")[2];

  if (req.url == `/users/${id}` && req.method == "PATCH") {
    return updateUserController(req, res, id);
  }

  // Fallback for unknown routes

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "not found." }));
}

module.exports = { router };
