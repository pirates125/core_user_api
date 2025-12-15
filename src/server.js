// Server entry point

const http = require("http");
const { PORT } = require("./config/env.js");

const server = http.createServer((request, response) => {
  response.writeHead(404, { "content-type": "application/json" });
  response.end(JSON.stringify({ message: "not found." }));
});

server.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
