const pool = require("../config/db.js");

async function findAllUsers() {
  const query = `
    SELECT id, name
    FROM users
    ORDER BY id ASC
  `;

  const result = await pool.query(query);
  return result.rows;
}

async function findUserByName(name) {
  const query = `
    SELECT id
    FROM users
    WHERE name = $1
  `;

  const result = await pool.query(query, [name]);
  return result.rows[0] || null;
}

/**
 *
 * @param {number} id
 */

async function findUserById(id) {
  const query = `
        SELECT id, name FROM users WHERE id = $1
    `;

  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}

/**
 *
 * @param {string} name
 */

async function createUser(name) {
  const query = `
    INSERT INTO users (name) VALUES ($1) RETURNING id, name
  `;

  const result = await pool.query(query, [name]);
  return result.rows[0];
}

async function updateUserById(id, name) {
  const query = `
    UPDATE users SET name = $1 WHERE id = $2 RETURNING id, name
  `;

  const result = await pool.query(query, [name, id]);
  return result.rows[0];
}

module.exports = {
  findUserById,
  createUser,
  findAllUsers,
  findUserByName,
  updateUserById,
};
