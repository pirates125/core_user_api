const { healthController } = require("../controllers/health.controller.js");
const {
  getAllUsersController,
  getUserController,
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
    return getAllUsersController(req, res);
  }

  const id = Number(req.url.split("/")[2]);

  if (req.url.startsWith("/users/") && req.method === "GET") {
    return getUserController(req, res, id);
  }

  if (req.url.startsWith("/users") && req.method == "POST") {
    return createUserController(req, res);
  }

  if (req.url.startsWith("/users/") && req.method === "PATCH") {
    return updateUserController(req, res, id);
  }

  // Fallback for unknown routes

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "not found." }));
}

module.exports = { router };
