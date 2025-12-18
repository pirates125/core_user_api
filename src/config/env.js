function getEnv(key, required = true) {
  const value = process.env[key];

  if (!value && required) {
    throw new Error(`Missing ENV variable: ${key}`);
  }

  return value;
}

const env = {
  nodeEnv: getEnv("NODE_ENV"),
  port: Number(getEnv("PORT")),

  db: {
    host: getEnv("DB_HOST"),
    port: Number(getEnv("DB_PORT")),
    name: getEnv("DB_NAME"),
    user: getEnv("DB_USER"),
    password: getEnv("DB_PASSWORD"),
  },
};

module.exports = env;
