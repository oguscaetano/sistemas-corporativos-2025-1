// models/usuarioModel.js
const pool = require('../db');

async function buscarPorUsuario(usuario) {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
  return rows[0];
}

async function criarUsuario(usuario, senha_hash) {
  const [result] = await pool.query('INSERT INTO usuarios (usuario, senha_hash) VALUES (?, ?)', [usuario, senha_hash]);
  return result.insertId;
}

module.exports = {
  buscarPorUsuario,
  criarUsuario
};
