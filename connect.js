const { Pool } = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.Username,
  password: process.env.Password,
  host: "localhost",
  port: 5432,
  database: process.env.DB,
});

module.exports = pool;
