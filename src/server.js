require("dotenv").config();

const env = require("./config/env.js");

const http = require("http");

const { router } = require("./routes");

const { requestLogger } = require("./middlewares/request-logger");

// Server entry point
// All incoming requests pass through the router

const server = http.createServer((request, response) => {
  requestLogger(request, response);
  router(request, response);
});

server.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});
