function sumarUno(numero, callback) {
    if (numero >= 7) {
        callback('Número muy alto');
        return;
    }
    setTimeout(function() {
        callback(null, numero + 1);
    }, 8000);
}

console.log(sumarUno(5, function(error, nuevoValor) {
    if (error) {
        console.log(error);
        return;
    }
    sumarUno(nuevoValor, function(error, nuevoValor2) {
        if (error) {
            console.log(error);
            return;
        }
        sumarUno(nuevoValor2, function(error, nuevoValor3) {
            if (error) {
                console.log(error);
                return;
            }
            console.log(nuevoValor3);
        });
    });
}));