const fezinha = [7, 14, 19, 27, 52, 58];

const megaSena = [];

for (let i = 0; i < 6; i ++) {
    const numeroGerado = Math.ceil(Math.random() * 60);
    
    if (megaSena.includes(numeroGerado)) {
        i--;
    } else {
        megaSena.push(numeroGerado);
    }
}

console.log(megaSena);

