function sumarUno(numero, callback) {
    var promesa = new Promise(function(resolve, reject) {
        if (numero >= 7) {
            reject('El número es muy alto');
            return;
        }
        setTimeout(function() {
            console.log(numero);
            resolve(numero + 1);
        }, 800);
    });

    return promesa;
}

sumarUno(5).then(sumarUno)
    .then(sumarUno)
    .then(sumarUno)
    .then(sumarUno)
    .then(sumarUno)
    .then(nuevoNumero => {
        console.log(nuevoNumero);
    })
    .catch(error => {
        console.log('Error en promesa');
        console.log(error);
    });