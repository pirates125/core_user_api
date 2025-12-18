const { log } = require("../utils/logger");

function handleError(error, res) {
  log("error", error.message, {
    status: error.statusCode || 500,
  });

  res.writeHead(error.statusCode || 500, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      error: error.message,
    })
  );
}

module.exports = {
  handleError,
};
