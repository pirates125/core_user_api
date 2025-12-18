const { healthController } = require("../controllers/health.controller.js");
const {
  getAllUsersController,
  getUserController,
  createUserController,
  updateUserController,
  deleteUserController,
} = require("../controllers/user.controller.js");

const { authMiddleware } = require("../middlewares/auth.middleware.js");

function router(req, res) {
  const pathname = req.url.split("?")[0];

  // ---------- PUBLIC ROUTES (NO AUTH) ----------

  if (pathname === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("OK");
  }

  if (pathname === "/health" && req.method === "GET") {
    return healthController(req, res);
  }

  // ---------- AUTH MIDDLEWARE ----------
  if (!authMiddleware(req, res)) {
    return;
  }

  // ---------- USERS ROUTES ----------

  if (pathname === "/users" && req.method === "GET") {
    return getAllUsersController(req, res);
  }

  if (pathname === "/users" && req.method === "POST") {
    return createUserController(req, res);
  }

  if (pathname.startsWith("/users/")) {
    const id = Number(pathname.split("/")[2]);

    if (!id) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid user id" }));
    }

    if (req.method === "GET") {
      return getUserController(req, res, id);
    }

    if (req.method === "PATCH") {
      return updateUserController(req, res, id);
    }

    if (req.method === "DELETE") {
      return deleteUserController(req, res, id);
    }
  }

  // ---------- FALLBACK ----------
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
}

module.exports = { router };
