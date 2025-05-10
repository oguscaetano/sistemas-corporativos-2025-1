const express = require('express');
const pool = require('../db');
const router = express.Router();

// Middleware de verificação
function verificarLogin(req, res, next) {
  if (!req.session.usuario) {
    return res.status(401).json({ mensagem: 'Você precisa estar logado para acessar esta rota.' });
  }
  next();
}

router.get('/', verificarLogin, async (req, res) => {
  try {
    const [produtos] = await pool.execute('SELECT * FROM produtos');
    res.json(produtos);
  } catch (erro) {
    console.error('Erro ao buscar produtos:', erro);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
});

module.exports = router;
