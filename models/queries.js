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
async function insertUser(email, hashedPassword, firstName, lastName, admin) {
  if (admin === "on") {
    await pool.query(
      "INSERT INTO users (email, password, first_name, last_name, admin_status) VALUES($1, $2, $3, $4, $5)",
      [email, hashedPassword, firstName, lastName, "true"],
    );
  } else {
    await pool.query(
      "INSERT INTO users (email, password, first_name, last_name) VALUES($1, $2, $3, $4)",
      [email, hashedPassword, firstName, lastName],
    );
  }
}

async function approveMember(id) {
  await pool.query(`UPDATE users SET membership_status = TRUE WHERE id = $1`, [
    id,
  ]);
}
async function insertMessage(title, message, userId) {
  await pool.query(
    `INSERT INTO messages (title, message, author_id) VALUES($1, $2, $3)`,
    [title, message, userId],
  );
}

async function getMessages() {
  const { rows } = await pool.query(
    `SELECT messages.id,title, message, created_at, users.first_name AS author FROM messages JOIN users ON author_id=users.id`,
  );
  return rows;
}
async function deleteMessage(messageId) {
  await pool.query(`DELETE FROM messages WHERE id = $1`, [messageId]);
}
module.exports = {
  findUserByEmail,
  findUserById,
  insertUser,
  approveMember,
  insertMessage,
  getMessages,
  deleteMessage,
};
