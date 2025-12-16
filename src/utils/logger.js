// Simple application logger
// Central place for all logs
function log(level, message, meta = {}) {
  const timestamp = new Date().toISOString();

  const logEntry = {
    timestamp,
    level,
    message,
    ...meta,
  };

  console.log(JSON.stringify(logEntry));
}

module.exports = {
  log,
};
