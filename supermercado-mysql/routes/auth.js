// auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');
const { criarUsuario } = require('../models/usuarioModel');

const router = express.Router();

router.post('/cadastro', async (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ mensagem: 'Usuário e senha são obrigatórios.' });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT * FROM usuarios WHERE usuario = ?',
      [usuario]
    );

    if (rows.length > 0) {
      return res.status(400).json({ mensagem: 'Usuário já existe.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuarioId = await criarUsuario(usuario, senhaHash);

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', id: novoUsuarioId });

  } catch (erro) {
    console.error('Erro ao cadastrar usuário:', erro);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
});


router.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;

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

    // Armazenar o usuário na sessão
    req.session.usuario = usuarioEncontrado.usuario;
    res.json({ mensagem: 'Login realizado com sucesso!', usuario: usuarioEncontrado.usuario });

  } catch (erro) {
    console.error('Erro ao realizar login:', erro);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
});

module.exports = router;
