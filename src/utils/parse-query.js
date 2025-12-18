const { URL } = require("url");

function parseQuery(req) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  return Object.fromEntries(url.searchParams.entries());
}

module.exports = {
  parseQuery,
};
