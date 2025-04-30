const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ mensagem: 'Usuário e senha são obrigatórios.' });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT * FROM usuarios WHERE usuario = ?',
      [usuario]
    );

    if (rows.length === 0) {
      return res.status(401).json({ mensagem: 'Usuário não encontrado.' });
    }

    const usuarioEncontrado = rows[0];

    const senhaCorreta = await bcrypt.compare(senha, usuarioEncontrado.senha_hash);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Usuário ou senha inválidos.' });
    }

    // Armazena na sessão
    req.session.usuario = usuarioEncontrado.usuario;
    res.json({ mensagem: 'Login realizado com sucesso!' });

  } catch (erro) {
    console.error('Erro ao realizar login:', erro);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
});

module.exports = router;
