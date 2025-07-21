const pool = require("./pool");

async function findUserByEmail(email) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return rows[0];
}

async function findUserById(id) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return rows[0];
}
async function insertUser(email, hashedPassword, firstName, lastName) {
  await pool.query(
    "INSERT INTO users (email, password, first_name, last_name) VALUES($1, $2, $3, $4)",
    [email, hashedPassword, firstName, lastName],
  );
}

async function approveMember(id) {
  await pool.query(`UPDATE users SET membership_status = TRUE WHERE id = $1`, [
    id,
  ]);
}
module.exports = { findUserByEmail, findUserById, insertUser, approveMember };
