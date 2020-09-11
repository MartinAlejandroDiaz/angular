import { Socket } from 'socket.io';

export const desconectar = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
};

export const mensaje = ( cliente: Socket) => {
    cliente.on("mensaje", ( payload: { de: string, cuerpo: string}) => {
        console.log('Mensaje recibido', payload );
    })

}