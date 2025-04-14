# **Como sistemas profissionais tratam senhas**

1. **Hash da senha, nunca senha pura**  
   Senhas nunca são armazenadas em texto plano (ex: `"1234"`). Em vez disso:
   - Usa-se um algoritmo de hash como `bcrypt`, `argon2` ou `scrypt`.
   - O hash é armazenado no banco de dados, não a senha original.

2. **Uso de `bcrypt` ou similares**  
   `bcrypt` é:
   - Lento de propósito, o que **desacelera ataques de força bruta**.
   - Adiciona automaticamente **salts** (aleatoriedade), então até senhas iguais têm hashes diferentes.
   - Suportado nativamente por bibliotecas em **Node.js, Python, Java, PHP**, etc.

3. **Na hora do login**  
   - Você não “descriptografa” nada.
   - Você **compara** a senha fornecida com o hash armazenado usando `bcrypt.compare`.

4. **Tokens e sessões**
   - Depois do login com sucesso, é comum emitir um **token JWT** ou iniciar uma **sessão de usuário**.

Ótima pergunta! Para um projeto simples como esse, um **uso prático e seguro de criptografia** seria **armazenar senhas de usuários com hash criptográfico** em vez de texto puro. Para isso, a melhor abordagem é utilizar o pacote [`bcrypt`](https://www.npmjs.com/package/bcrypt), que é amplamente usado para **criptografar (hash) senhas** de forma segura.

## **Onde aplicar a criptografia?**

No nosso projeto, temos um login hardcoded:

```js
if (usuario === "admin" && senha === "1234")
```

O ideal seria armazenar um **hash da senha** e verificar o hash no momento do login.

---

## **Passo a passo para implementar o `bcrypt`**

### 1. Instale o `bcrypt`

```bash
npm install bcrypt
```

### 2. Criando uma senha hash de exemplo

Crie um arquivo separado somente para gerar senhas hash.

```js
const bcrypt = require("bcrypt");

const senha = "1234";
bcrypt.hash(senha, 10).then(hash => {
    console.log("Hash gerado:", hash);
});
```

### 3. Simule um cadastro

Adicione uma simulação de usuário com senha **criptografada**:

```js
const bcrypt = require("bcrypt");

// Usuário com senha criptografada (hash gerado previamente com bcrypt)
const usuarioFake = {
  nome: "admin",
  senhaHash: "$2b$10$ib0hAnvrNtVcWY2865mkYOLYIzmovOuzwmecvoaozDjXYYsN9Z2mW" // Senha 1234
};
```

### 4. Atualize a rota de login para usar o `bcrypt.compare`

```js
app.post("/login", async (req, res) => {
    const { usuario, senha } = req.body;

    if (usuario === usuarioFake.nome) {
        const senhaCorreta = await bcrypt.compare(senha, usuarioFake.senhaHash);

        if (senhaCorreta) {
            const token = jwt.sign({ usuario }, SECRET_KEY, {
                expiresIn: "1h"
            });

            return res.json({
                mensagem: "Login com senha criptografada executado com sucesso!",
                token,
            });
        }
    }

    res.status(401).json({ mensagem: "Usuário ou senha inválidos." });
});
```

### 5. Vantagens dessa abordagem

- Senhas **nunca ficam visíveis** nem mesmo no servidor.
- Mesmo que alguém copie o banco, não saberá a senha original.
- `bcrypt` adiciona **salts** automaticamente, dificultando ataques de dicionário.

## **Criar usuários com a senha criptografada automaticamente**

Vamos criar um arquivo com uma lista de usuários.

```js
let usuarios = []; // Vai armazenar os usuários cadastrados

export {
    usuarios,
}
```

### Crie uma rota POST `/cadastro` que salva o usuário com senha criptografada

```js
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
```

### Faça testes via Postman

- **Body (JSON):**

```json
{
  "usuario": "admin",
  "senha": "1234"
}
```

### Atualize a sua rota de Login

Na hora do login, você **procura o usuário** e usa `bcrypt.compare` para verificar se a senha está correta:

```js
app.post("/login", async (req, res) => {
    const { usuario, senha } = req.body;

    const usuarioEncontrado = usuarios.find((user) => user.usuario === usuario);

    if (!usuarioEncontrado) {
        res.status(401).json({
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
```