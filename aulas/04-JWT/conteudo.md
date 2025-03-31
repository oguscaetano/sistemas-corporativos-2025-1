# O que é JWT?  
JWT (**JSON Web Token**) é uma forma segura de autenticação onde um token é gerado para identificar um usuário. Esse token é enviado junto com as requisições para provar que o usuário está autenticado.

### **Analogia**  
Imagine que você vai a um parque de diversões.  
1. **Na entrada, você recebe uma pulseira** 🏷️ que indica que você pagou.  
2. **Durante o dia, ao entrar em brinquedos, os funcionários conferem sua pulseira** para garantir que você tem acesso.  
3. **Se tentar entrar sem pulseira, será barrado.**  

No nosso caso:  
✅ O usuário faz **login** e recebe um **JWT** (pulseira).  
✅ Esse JWT é enviado nas requisições para acessar recursos protegidos.  
✅ Se o token for válido, o usuário pode acessar as rotas (endpoints).  
✅ Se não tiver um token ou for inválido, o acesso é negado.

## Como adicionar JWT ao nosso projeto

### Passo 1: Instalar a biblioteca
Precisamos instalar o pacote `jsonwebtoken` para gerar e validar tokens:

```sh
npm install jsonwebtoken
```

# Passo 2: Criar um sistema de autenticação
Vamos adicionar uma **rota de login** que retorna um **JWT** quando o usuário se autentica.

### Adicione esse código ao seu `index.js`:

```javascript
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// Chave secreta usada para assinar e verificar os tokens JWT
const SECRET_KEY = 'senha-misteriosa';

// Rota de login para gerar um token JWT
app.post("/login", (req, res) => {
    const { usuario, senha } = req.body; // Pegamos os dados enviados no corpo da requisição

    // Simulação de verificação de usuário e senha (sem banco de dados)
    if (usuario === "admin" && senha === "1234") {
        // Criamos um token JWT com o usuário como payload
        const token = jwt.sign({ usuario }, SECRET_KEY, {
            expiresIn: "1h" // Token expira em 1 hora
        });

        return res.json({ 
            mensagem: "Login executado com sucesso!",
            token, // Retornamos o token gerado para o cliente
        });
    }

    // Se o login falhar, retorna erro 401 (Não autorizado)
    res.status(401).json({
        mensagem: "Usuário ou senha inválidos.",
    });
});

// Middleware para autenticação via JWT
const autenticarToken = (req, res, next) => {
    const token = req.headers["authorization"]; // Pega o token do cabeçalho Authorization

    if (!token) {
        return res.status(403).json({ // Se não houver token, bloqueia o acesso
            mensagem: "Token não fornecido",
        });
    }

    // Verifica se o token é válido
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                mensagem: "Token inválido",
            });
        }

        // Se o token for válido, adicionamos o usuário ao request
        req.usuario = decoded.usuario;
        next(); // Passa para a próxima função na requisição
    });
};

// Rota protegida - Apenas usuários autenticados podem acessar
app.get("/produtos", autenticarToken, (req, res) => {
    res.json(produtos); // Retorna a lista de produtos apenas se autenticado
});

// Outras rotas protegidas também usam `autenticarToken` para exigir autenticação
app.post("/produtos", autenticarToken, (req, res) => {
    const novoProduto = req.body;
    novoProduto.id = produtos.length + 1;
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

app.put("/produtos/:id", autenticarToken, (req, res) => {
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

app.delete("/produtos/:id", autenticarToken, (req, res) => {
    const id = parseInt(req.params.id);
    
    const index = produtos.findIndex(prod => prod.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    produtos.splice(index, 1);

    res.json({ mensagem: "Produto removido com sucesso" });
});

// Inicializa o servidor na porta 3000
app.listen(3000, () => {
    console.log("VAI!");
});
```

# Passo 3: Testar com Postman
Agora vamos testar!

### 1️⃣ Fazer login e obter um token
- **Método:** `POST`
- **URL:** `http://localhost:3000/login`
- **Body (JSON):**
  ```json
  {
    "usuario": "admin",
    "senha": "1234"
  }
  ```
- **Resposta esperada:**
  ```json
  {
    "mensagem": "Login bem-sucedido!",
    "token": "eyJhbGciOiJIUzI1..."
  }
  ```

>**⚠️ Copie o token retornado!**  

### 2️⃣ Acessar `/produtos` com o token
Agora tente acessar **sem o token**:
- **Método:** `GET`
- **URL:** `http://localhost:3000/produtos`

📌 **Resposta esperada:**
```json
{
    "mensagem": "Token não fornecido"
}
```
>💡 O acesso foi negado porque você não está autenticado!

Agora, vamos enviar o **token**:
1. Vá até a aba **Headers** no Postman.
2. Adicione um novo cabeçalho:
   - **Key:** `Authorization`
   - **Value:** `SEU_TOKEN_AQUI`
3. Clique em **Send**.

**Agora a resposta será:**
```json
[
    { "id": 1, "nome": "Arroz", "preco": 10.99 },
    { "id": 2, "nome": "Feijão", "preco": 8.50 },
    { "id": 3, "nome": "Macarrão", "preco": 5.75 }
]
```

# RESUMO
🔹 O usuário faz login e recebe um **JWT**.  
🔹 O JWT é enviado no **cabeçalho Authorization** para acessar rotas protegidas.  
🔹 Se o token for válido, o acesso é concedido.  
🔹 Se o token for inválido ou ausente, o acesso é negado.