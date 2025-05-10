// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',       // ou o IP do seu servidor MySQL
  user: 'root',            // seu usuário do MySQL
  password: '123456',   // sua senha do MySQL
  database: 'supermercado',    // nome do seu banco de dados
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
