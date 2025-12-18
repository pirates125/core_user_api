const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "kaanoba",
  password: "postgres",
  database: "core_api",
});

module.exports = pool;
