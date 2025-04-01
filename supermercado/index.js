const express = require('express');

const app = express();

app.use(express.json());

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

  app.get('/produtos', (req, res) => {
    res.json(produtos);
  });

  app.post("/produtos", (req, res) => {
    const novoProduto = req.body;
    novoProduto.id = produtos.length + 1;
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
  });

  app.put("/produtos/:id", (req, res) => {
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

  app.delete("/produtos/:id", (req, res) => {
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
