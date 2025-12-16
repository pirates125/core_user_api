const { HttpError } = require("../errors/http-error.js");

// Simple authorization check
// This is NOT real auth, only architectural demonstration

function authMiddleware(req) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    throw new HttpError(401, "Unauthorized");
  }
}

module.exports = {
  authMiddleware,
};
