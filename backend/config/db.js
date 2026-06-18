const { Pool } = require("pg");

const pool = new Pool({
  user: "",
  password: "",
  host: "localhost",
  port: 5432,
  database: "quanlythuenha"
});

module.exports = pool;