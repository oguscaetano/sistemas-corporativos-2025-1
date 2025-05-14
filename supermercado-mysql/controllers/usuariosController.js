// controllers/usuariosController.js
const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuarioModel');

async function cadastrar(req, res) {
  const { usuario, senha } = req.body;

  try {
    const existe = await usuarioModel.buscarPorUsuario(usuario);

    if (existe) {
      return res.status(400).json({ mensagem: "Usuário já cadastrado" });
    }

    const senha_hash = await bcrypt.hash(senha, 10);
    const id = await usuarioModel.criarUsuario(usuario, senha_hash);

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao cadastrar usuário" });
  }
}

async function login(req, res) {
  const { usuario, senha } = req.body;

  try {
    const usuarioEncontrado = await usuarioModel.buscarPorUsuario(usuario);

    if (!usuarioEncontrado) {
      return res.status(401).json({ mensagem: "Usuário não encontrado." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuarioEncontrado.senha_hash);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Usuário ou senha inválidos." });
    }

    res.json({ mensagem: "Login feito com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro no login" });
  }
}

module.exports = {
  cadastrar,
  login
};
