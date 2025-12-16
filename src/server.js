const http = require("http");
const { PORT } = require("./config/env.js");

const { router } = require("./routes");

// Server entry point
// All incoming requests pass through the router

const server = http.createServer((request, response) => {
  router(request, response);
});

server.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
