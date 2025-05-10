const express = require('express');
const session = require('express-session');
const produtosRoutes = require('./routes/produtos');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());

// Sessão
app.use(session({
  secret: 'segredo-secreto',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // IMPORTANTE para funcionar no Postman/local
}));

// Rotas
app.use('/', authRoutes);
app.use('/produtos', produtosRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
