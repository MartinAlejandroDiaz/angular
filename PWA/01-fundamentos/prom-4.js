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
            setTimeout(() => {
                // resolve(numero + 1);
                reject('Sumar Rapido fallo');
            }, 1000);
        });
    }
    // sumarRapido(10).then(console.log);
    // sumarLento(5).then(console.log);

let cosas = [sumarRapido(10), sumarLento(5)];

// Promise.all(cosas)
//     .then(respuestas => {
//         console.log(respuestas);
//     })
//     .catch(console.log);

Promise.race(cosas)
    .then(repsuesta => {
        console.log(respuesta);
    })
    .catch(console.log);