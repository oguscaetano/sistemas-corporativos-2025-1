const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const produtos = require('./data/produtos.json');
const usuarios = require('./data/usuarios.json');

const app = express();
app.use(express.json());

const SECRET_KEY = 'senha-misteriosa';

app.post("/login", async (req, res) => {
  const { usuario, senha } = req.body;

  const usuarioEncontrado = usuarios.find((user) => user.usuario === usuario);

  if (!usuarioEncontrado) {
    return res.status(401).json({
      mensagem: "Usuário não encontrado.",
    });
  }

  const senhaCorreta = await bcrypt.compare(senha, usuarioEncontrado.senhaHash);

  if (!senhaCorreta) {
    res.status(401).json({
      mensagem: "Usuário ou senha inválidos.",
    });
  }

  const token = jwt.sign({ usuario }, SECRET_KEY, {
    expiresIn: "1h"
  });

  res.json({ mensagem: "Login feito com sucesso!", token });

});

app.post("/cadastro", async (req, res) => {
  const { usuario, senha } = req.body;

  // Verifica se o usuário já existe
  const jaExiste = usuarios.find(u => u.usuario === usuario);
  if (jaExiste) {
    return res.status(400).json({ mensagem: "Usuário já cadastrado" });
  }

  // Gera o hash da senha com 10 rounds de salt
  const senhaHash = await bcrypt.hash(senha, 10);

  // Adiciona usuário com a senha já criptografada
  usuarios.push({ usuario, senhaHash });

  res.status(201).json(
    {
      mensagem: "Usuário cadastrado com sucesso!",
      usuario,
      senhaHash
    });
});

const autenticarToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      mensagem: "Token não encontrado.",
    })
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        mensagem: "Token inválido",
      })
    }

    req.usuario = decoded.usuario;
    next();
  })
};

app.get('/produtos', autenticarToken, (req, res) => {
  res.json(produtos);
});

app.post("/produtos", autenticarToken, (req, res) => {
  const novoProduto = req.body;
  novoProduto.id = produtos.length + 1;
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

app.put("/produtos/:id", autenticarToken, (req, res) => {
  console.log(req);
  const id = parseInt(req.params.id);
  const produtoAtualizado = req.body;

  let index = produtos.findIndex((produto) => produto.id === id);

  if (index !== -1) {
    produtos[index] = { id, ...produtoAtualizado };
    res.json(produtos[index]);
  } else {
    res.status(404).json({
      mensagem: "Este produto não existe.",
    })
  }
});

app.delete("/produtos/:id", autenticarToken, (req, res) => {
  const id = parseInt(req.params.id);

  let index = produtos.findIndex((produto) => produto.id === id);

  if (index === -1) {
    return res.status(404).json({
      mensagem: "Este produto não existe.",
    })
  }

  produtos.splice(index, 1);

  res.json({
    mensagem: "Produto eliminado com sucesso!",
  })
})

app.listen(3000, () => {
  console.log("Vai Curintia!");
});
