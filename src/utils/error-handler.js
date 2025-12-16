// Central error response handler
// Converts thrown errors into HTTP responses

function handleError(error, res) {
  const statusCode = error.statusCode || 500;

  const message = statusCode === 500 ? "Internal server error." : error.message;

  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message }));
}

module.exports = { handleError };
