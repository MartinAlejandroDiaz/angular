// if ('serviceWorker' in navigator) {
//     console.log("podemos usarlo");
// }

// confirmar si podemos usar el sw
if (navigator.serviceWorker){
    // console.log('podemos usar SW');

    navigator.serviceWorker.register('../sw.js')
}