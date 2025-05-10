const imagem = document.querySelector('img');
const nome = document.getElementById('nome');
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const input = document.querySelector('#id');

    const endpoint = input.value;

    fetch(`http://viacep.com.br/ws/${endpoint}/json/`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            
            // imagem.src = `${data.sprites.front_default}`;
            nome.innerText = `${data.logradouro}`;
        });
})

