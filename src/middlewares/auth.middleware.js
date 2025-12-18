const { HttpError } = require("../errors/http-error.js");

// Simple authorization check
// This is NOT real auth, only architectural demonstration

function authMiddleware(req, res) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Authorization header missing" }));
    return false;
  }

  if (!authHeader.startsWith("Bearer ")) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid authorization format" }));
    return false;
  }

  // şimdilik token validate ETMİYORUZ (bilinçli)
  return true;
}

module.exports = {
  authMiddleware,
};
