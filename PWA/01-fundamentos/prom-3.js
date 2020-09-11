function retornaTrue() {
    return true;
}

function sumarLento(numero) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(numero + 1);
            // reject('Sumar Lento fallo');
        }, 800);
    })
}

let sumarRapido = (numero) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(numero + 1), 300);
    });
}
sumarRapido(10).then(console.log);
sumarLento(5).then(console.log);

let cosas = [sumarRapido(10), sumarLento(5), true, 'hola mundo', retornaTrue()];

Promise.all(cosas)
    .then(respuestas => {
        console.log(respuestas);
    })
    .catch(console.log);