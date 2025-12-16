// Parses incoming JSON request body
// Intentionally simple for learning purposes

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    // Request body data is processed piecemeal via stream.

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (error) {
        reject(new Error("Invalid JSON body."));
      }
    });
  });
}
module.exports = { parseJsonBody };
