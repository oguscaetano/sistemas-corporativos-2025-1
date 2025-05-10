const bcrypt = require('bcrypt');

const senha = '1234';

bcrypt.hash(senha, 10)
    .then((hash) => {
        console.log("Hash: ", hash);
    });