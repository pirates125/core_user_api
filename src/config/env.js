function getEnv(key, required = true) {
  const value = process.env[key];

  if (!value && required) {
    throw new Error(`ENV ${key} is required`);
  }

  return value;
}

module.exports = {
  port: getEnv("PORT"),
  nodeEnv: getEnv("NODE_ENV"),
  db: {
    host: getEnv("DB_HOST"),
    port: getEnv("DB_PORT"),
    name: getEnv("DB_NAME"),
    user: getEnv("DB_USER"),
    password: getEnv("DB_PASSWORD"),
  },
};
