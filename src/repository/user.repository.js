const pool = require("../config/db.js");

async function createUserWithProfile(user) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const userResult = await client.query(
      "INSERT INTO users (name) VALUES ($1) RETURNING id",
      [user.name]
    );

    const userId = userResult.rows[0].id;

    await client.query("INSERT INTO profiles (user_id) VALUES ($1)", [userId]);

    await client.query("COMMIT");

    return { userId };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

async function findAllUsers({ limit, offset, filters, sort, order }) {
  let baseQuery = `
    SELECT id, name
    FROM users
    WHERE deleted_at IS NULL
  `;

  const values = [];
  let index = 1;

  if (filters.name) {
    baseQuery += ` AND name ILIKE $${index}`;
    values.push(`%${filters.name}%`);
    index++;
  }

  baseQuery += ` ORDER BY ${sort} ${order}`;
  baseQuery += ` LIMIT $${index} OFFSET $${index + 1}`;

  values.push(limit, offset);

  const result = await pool.query(baseQuery, values);
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
        SELECT id, name FROM users WHERE id = $1 AND deleted_at IS NULL
    `;

  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}

async function softDeleteUserById(id) {
  const query = `
    UPDATE users
    SET deleted_at = NOW()
    WHERE id = $1
      AND deleted_at IS NULL
    RETURNING id
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
  softDeleteUserById,
};
