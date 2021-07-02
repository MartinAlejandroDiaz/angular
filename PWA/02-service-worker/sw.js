// console.log('SW: Hola mundo 2');

self.addEventListener('fetch', event => {
    // if ( event.request.url.includes('style.css') ) {
    //     event.respondWith( null );    
    // } else {
    //     event.respondWith( fetch(event.request) );
    // }
    // console.log(event.request.url.includes('.css'));
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // if ( event.request.url.includes('.jpg')) {
    //     console.log( event.request.url );

    //     // let fotoReq = fetch('img/main.jpg');
    //     // let fotoReq = fetch( event.request.url );
    //     let fotoReq = fetch( event.request );

    //     event.respondWith( fotoReq );
    // }
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // if ( event.request.url.includes('style.css')) {
    //     let respuesta = new Response(`
    //         body {
    //             background-color: red !important;
    //             color: pink;
    //         }`,{
    //             headers: {
    //                 'Content-Type': 'text/css'
    //             }
    //         });
    //         event.respondWith( respuesta );
    // }
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // if ( event.request.url.includes('main.jpg')) {
    //     let img = fetch('img/main-patas-arriba.jpg');
    //     event.respondWith( img );
    //     // event.respondWith( fetch('img/main-patas-arriba.jpg') );
    // }
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const resp = fetch(event.request)
            .then( resp => {
                return  ( resp.ok ) ? resp : fetch('img/main.jpg');    
            });
        event.respondWith( resp );

});