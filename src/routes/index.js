const { healthController } = require("../controllers/health.controller.js");

// Central router function
// Decides which controller will handle the request

function router(req, res) {
  if (req.url == "/health" && req.method == "GET") {
    return healthController(req, res);
  }

  // Fallback for unknown routes

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "not found." }));
}

module.exports = { router };
