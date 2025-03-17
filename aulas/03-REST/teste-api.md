# Exemplo de aquivo `metodos.http` para testar rotas

```sh
GET http://localhost:3000/produtos HTTP/1.1

###

POST http://localhost:3000/produtos HTTP/1.1
content-type: application/json

{
    "nome": "pao de forma",
    "preco": 4.99
}

###

PUT http://localhost:3000/produtos/10 HTTP/1.1
content-type: application/json

{
    "nome": "Sacolé",
    "preco": 756.12
}

###

DELETE http://localhost:3000/produtos/1 HTTP/1.1
content-type: application/json
```