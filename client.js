// Importamos el módulo 'net' para crear un cliente TCP
const net = require('net');

// Importamos el módulo 'readline' para leer la entrada del usuario por consola
const readline = require('readline');

// Creamos la interfaz para leer la entrada del usuario
// process.stdin lee lo que escribe el usuario
// process.stdout muestra los mensajes en consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Creamos el cliente TCP usando el módulo 'net'
const client = new net.Socket();

// Establecemos la conexión con el servidor en el puerto 8080
client.connect(8080, 'localhost', () => {
    console.log('Conectado al servidor TCP');
    console.log('-----------------------------------');
    console.log('Comandos disponibles:');
    console.log('GET BOOKS');
    console.log('ADD BOOK {"titulo": "Dune", "autorId": "1", "editorialId": "1", "anio": 1965}');
    console.log('GET AUTHORS');
    console.log('ADD AUTHOR {"nombre": "Brandon Sanderson", "nacionalidad": "Estadounidense"}');
    console.log('GET PUBLISHERS');
    console.log('ADD PUBLISHER {"nombre": "Minotauro", "pais": "Argentina"}');
    console.log('-----------------------------------');

    // Le pedimos al usuario que escriba un comando
    rl.question('Escribí un comando: ', (command) => {
        // Enviamos el comando al servidor
        client.write(command);
    });
});

// Evento que se dispara cuando el servidor responde
client.on('data', (data) => {
    console.log('Respuesta del servidor:');
    // Convertimos los datos recibidos a texto y los mostramos
    console.log(data.toString());

    // Cerramos la interfaz de lectura
    rl.close();

    // Cerramos la conexión con el servidor
    client.destroy();
});

// Evento que se dispara cuando se cierra la conexión
client.on('close', () => {
    console.log('Conexión cerrada');
});

// Evento para manejar errores de conexión
client.on('error', (error) => {
    console.error('Error de conexión:', error);
});