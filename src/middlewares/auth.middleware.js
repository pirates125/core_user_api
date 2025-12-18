const { HttpError } = require("../errors/http-error.js");

// Simple authorization check
// This is NOT real auth, only architectural demonstration

function authMiddleware(req, res) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "error",
        message: "Unauthorized",
      })
    );
    return false;
  }

  if (!authHeader.includes("Bearer")) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "error",
        message: "Invalid authorization format",
      })
    );
    return false;
  }

  return true;
}

module.exports = {
  authMiddleware,
};
