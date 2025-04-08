const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = 'senha-misteriosa';

const produtos = [
    {
      id: 1,
      nome: "Arroz Integral",
      preco: 12.99,
      dataValidade: "2025-08-15",
      quantidadeEstoque: 50
    },
    {
      id: 2,
      nome: "Feijão Preto",
      preco: 8.49,
      dataValidade: "2025-10-10",
      quantidadeEstoque: 75
    },
    {
      id: 3,
      nome: "Leite Desnatado",
      preco: 6.99,
      dataValidade: "2024-12-05",
      quantidadeEstoque: 30
    },
    {
      id: 4,
      nome: "Óleo de Soja",
      preco: 9.99,
      dataValidade: "2026-03-20",
      quantidadeEstoque: 100
    },
    {
      id: 5,
      nome: "Açúcar Mascavo",
      preco: 7.25,
      dataValidade: "2025-06-30",
      quantidadeEstoque: 40
    }
  ];

  app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    if (usuario === 'admin' && senha === '1234') {
      const token = jwt.sign({ usuario }, SECRET_KEY, {
        expiresIn: '1h',
      });

      return res.json({
        mensagem: 'Login executado com sucesso!',
        token,
      })
    }

    res.status(401).json({
      mensagem: 'Usuário ou senha inválidos.',
    })
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
