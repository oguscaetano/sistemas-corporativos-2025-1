# Introdução a REST em JavaScript  

O que é `REST` e por que usamos APIs em sistemas corporativos?  
`REST` é um conjunto de regras que permite que sistemas diferentes se comuniquem via internet.  
Exemplo do dia a dia: aplicativos de delivery que buscam produtos no banco de dados de um supermercado.  

Imagine que temos um supermercado chamado **"Super JS"**.  
O "Super JS" precisa de um sistema para gerenciar seus produtos e pedidos.  
Criamos uma `API REST` para permitir que diferentes partes do sistema conversem entre si.  

## Fundamentos do JavaScript e APIs REST

### Introdução ao JavaScript
- Variáveis e tipos de dados básicos (string, number, boolean).  
- Arrays e objetos (com foco em listas de produtos).  
- Funções e callbacks.  

**Exemplo:**  
```javascript
// Definição de um produto no supermercado
let produto = {
    id: 1,
    nome: "Arroz",
    preco: 10.99
};

console.log(produto.nome); // "Arroz"
```

### O que é uma API REST?  
REST significa **Representational State Transfer**.  
Utiliza métodos HTTP para comunicação:  
- **GET** → Buscar informações.  
- **POST** → Criar um novo item.  
- **PUT** → Atualizar um item.  
- **DELETE** → Remover um item.  

## Instalação do Node e Express
O **Node.js** é um ambiente de execução para JavaScript fora do navegador e é essencial para criar um servidor com Express.

### Passo 1: Baixar e instalar o Node.js
1. Acesse o site oficial do Node.js:  
   🔗 [https://nodejs.org/](https://nodejs.org/)
2. Escolha a versão **LTS (Long-Term Support)**, pois é mais estável.
3. Baixe o instalador e siga as instruções da instalação (próximo, próximo... concluir).
4. Durante a instalação, **marque a opção** para adicionar o Node.js ao PATH do sistema.

### Passo 2: Verificar a instalação
Após a instalação, abra o **Prompt de Comando** e digite:

```sh
node -v
```
Isso deve exibir a versão instalada do Node.js, algo como:

```
v22.14.0
```

Para verificar se o **npm** (gerenciador de pacotes do Node) está instalado, digite:

```sh
npm -v
```

Saída esperada:

```
10.9.2
```

Se ambos os comandos retornarem versões, a instalação foi concluída com sucesso! ✅

## Criando um Projeto Node.js
Agora, vamos criar uma pasta para nosso projeto e inicializar um ambiente Node.

### Passo 1: Criar uma pasta para o projeto
Abra o terminal e execute:

```sh
mkdir supermercado-api
cd supermercado-api
```

### Passo 2: Inicializar um projeto Node.js
No diretório do projeto, execute:

```sh
npm init -y
```

Isso criará um arquivo **`package.json`**, que gerencia as dependências do projeto.

## Instalando o Express.js
Agora, vamos instalar o **Express**, que é um framework para criar APIs REST de forma simples.

Execute o seguinte comando no terminal:

```sh
npm install express
```

Isso instalará o Express e salvará a dependência no `package.json`.

## Criando uma API REST Simples com JavaScript e JSON

Vamos simular uma API com um `Array de Produtos`  
  
```javascript
let produtos = [
    { id: 1, nome: "Arroz", preco: 10.99 },
    { id: 2, nome: "Feijão", preco: 8.50 },
    { id: 3, nome: "Macarrão", preco: 5.75 }
];

// Listando produtos
console.log("Lista de Produtos:", produtos);
```

### Criando um Servidor Simples com Node.js e Express 

**Exemplo:**  
Aqui está o código com comentários explicando cada linha:

```javascript
// Importa o framework Express para criar o servidor
const express = require("express");

// Cria uma instância do aplicativo Express
const app = express();

// Configura o Express para interpretar requisições com corpo em JSON
app.use(express.json());

// Simula um banco de dados com uma lista de produtos
let produtos = [
    { id: 1, nome: "Arroz", preco: 10.99 },
    { id: 2, nome: "Feijão", preco: 8.50 },
    { id: 3, nome: "Macarrão", preco: 5.75 }
];

// Define uma rota GET para listar todos os produtos
app.get("/produtos", (req, res) => {
    res.json(produtos); // Retorna a lista de produtos em formato JSON
});

// Inicia o servidor na porta 3000 e exibe uma mensagem no console
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
```

**Explicação geral**
1. Importamos o **Express** para facilitar a criação do servidor.
2. Criamos uma instância do Express chamada `app`, que será usada para definir as rotas.
3. Configuramos o **middleware** `express.json()` para permitir o recebimento de dados em formato JSON nas requisições.
4. Criamos um array chamado `produtos` para simular um banco de dados.
5. Definimos uma rota `GET /produtos` que retorna a lista de produtos em JSON.
6. Iniciamos o servidor na porta **3000**, e exibimos uma mensagem no console para indicar que ele está rodando.

Para subir o servidor, execute o comando:
```sh
node script.js
```

Ao acessar `http://localhost:3000/produtos`, o navegador retornará a lista de produtos. 🚀

## Manipulando Dados via API REST

### Criando um Novo Produto (POST) 
 
```javascript
app.post("/produtos", (req, res) => {
    const novoProduto = req.body;
    novoProduto.id = produtos.length + 1;
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});
```
 
Faça o teste dos métodos utilizando a extensão `API Client Lite`.

### Atualizando um Produto (PUT)  
 
```javascript
app.put("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const produtoAtualizado = req.body;

    let index = produtos.findIndex(prod => prod.id === id);
    if (index !== -1) {
        produtos[index] = { id, ...produtoAtualizado };
        res.json(produtos[index]);
    } else {
        res.status(404).json({ mensagem: "Produto não encontrado" });
    }
});
```

### Removendo um Produto (DELETE)  
 
```javascript
app.delete("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    
    // Encontrar o índice do produto no array
    const index = produtos.findIndex(prod => prod.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    // Remove o produto do array
    produtos.splice(index, 1);

    res.json({ mensagem: "Produto removido com sucesso" });
});
```

## Exercício Prático

### Gerenciar Pedidos no Super JS* 
- Criar um novo array `pedidos` e uma rota `/pedidos`.  
- Criar um `POST /pedidos` para adicionar pedidos.  
- Criar um `GET /pedidos` para listar pedidos.  
- Criar um `PUT /pedidos` para alterar pedidos.  
- Criar um `DELETE /pedidos/:id` para cancelar um pedido.  