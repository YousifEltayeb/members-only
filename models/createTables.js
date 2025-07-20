#! /usr/bin/env node
const { argv } = require("node:process");

const { Pool } = require("pg");

const DB_URL = argv[2];
const SQL = `
CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL UNIQUE,
  membership_status BOOLEAN NOT NULL DEFAULT FALSE,
  admin_status BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  author_id INTEGER NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`;

async function main() {
  console.log("seeding...");
  const pool = new Pool({
    connectionString: DB_URL,
  });

  try {
    await pool.query(SQL);
  } catch (error) {
    console.error(error);
  } finally {
    await pool.end();
    console.log("done");
  }
}

main();
