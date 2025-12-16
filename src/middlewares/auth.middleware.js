const { HttpError } = require("../errors/http-error.js");

// Simple authorization check
// This is NOT real auth, only architectural demonstration

function authMiddleware(req) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    throw new HttpError(401, "unauthorization.");
  }

  const [type, token] = authHeader.trim().split(" ");

  if (type !== "Bearer" && !token) {
    throw new HttpError(401, "authorization format must be: Bearer <token>");
  }
}

module.exports = {
  authMiddleware,
};
