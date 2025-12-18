const { randomUUID } = require("crypto");
const { log } = require("../utils/logger");

function requestLogger(req, res) {
  const requestId = randomUUID();
  const startTime = Date.now();

  req.requestId = requestId;

  log("info", "request started", {
    requestId,
    method: req.method,
    url: req.url,
  });

  res.on("finish", () => {
    const duration = Date.now() - startTime;

    log("info", "request finished", {
      requestId,
      statusCode: res.statusCode,
      durationMs: duration,
    });
  });
}

module.exports = {
  requestLogger,
};
