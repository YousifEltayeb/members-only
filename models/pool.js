require("dotenv").config();

const { Pool } = require("pg");

const { DB_URL } = process.env;
const pool = new Pool({
  connectionString: DB_URL,
});

module.exports = pool;
