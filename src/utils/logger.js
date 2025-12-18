// Simple application logger
// Central place for all logs
const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "../logs/app.log");

function writeLog(level, message, meta = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  };

  fs.appendFile(LOG_FILE, JSON.stringify(logEntry) + "\n", (err) => {
    if (err) {
      console.error("LOG WRITE FAILED", err);
    }
  });
}

function log(level, message, meta) {
  writeLog(level.toUpperCase(), message, meta);
}

module.exports = {
  log,
};
