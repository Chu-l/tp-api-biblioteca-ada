// Importamos el módulo 'net' que nos permite crear un servidor TCP
const net = require('net');

// Importamos el módulo 'uuid' para generar identificadores únicos
const { v4: uuidv4 } = require('uuid');

// Importamos los tres controllers para manejar la lógica de cada entidad
const booksController = require('./controllers/booksController');
const authorsController = require('./controllers/authorsController');
const publishersController = require('./controllers/publishersController');

// Función para validar si una cadena es un JSON válido
// verifica que empiece con { y termine con }
function isJSON(str) {
    return str.startsWith('{') && str.endsWith('}');
}

// Creamos el servidor TCP usando net.createServer
// cada vez que un cliente se conecta se ejecuta esta función
const server = net.createServer((socket) => {
    console.log('Cliente conectado');

    // Evento que se dispara cuando el servidor recibe datos del cliente
    socket.on('data', (data) => {

        // Convertimos los datos recibidos a texto y eliminamos espacios al inicio y al final
        const command = data.toString().trim();

        // ***COMANDOS DE LIBROS***

        if (command === 'GET BOOKS') {
            // Obtenemos todos los libros y los enviamos al cliente
            const response = booksController.getBooks();
            socket.write(response);

        } else if (command.startsWith('ADD BOOK')) {
            // Extraemos el JSON del comando eliminando la parte 'ADD BOOK '
            // Ejemplo: ADD BOOK {"titulo": "Dune", "autorId": "1", "editorialId": "1", "anio": 1965}
            const bookDataString = command.replace('ADD BOOK ', '');

            if (isJSON(bookDataString)) {
                const bookData = JSON.parse(bookDataString); 

                if (bookData && typeof bookData === 'object') {
                    // Creamos el nuevo libro con un id único generado por uuidv4
                    const newBook = { id: uuidv4(), ...bookData };
                    const response = booksController.addBook(newBook);
                    socket.write(response);
                } else {
                    socket.write('Error: Datos del libro inválidos');
                }
            } else {
                socket.write('Error: Formato de JSON no válido');
            }

        // ***COMANDOS DE AUTORES***

        } else if (command === 'GET AUTHORS') {
            // Obtenemos todos los autores y los enviamos al cliente
            const response = authorsController.getAuthors();
            socket.write(response);

        } else if (command.startsWith('ADD AUTHOR')) {
            // Extraemos el JSON del comando eliminando la parte 'ADD AUTHOR '
            // Ejemplo: ADD AUTHOR {"nombre": "Brandon Sanderson", "nacionalidad": "Estadounidense"}
            const authorDataString = command.replace('ADD AUTHOR ', '');

            if (isJSON(authorDataString)) {
                const authorData = JSON.parse(authorDataString);

                if (authorData && typeof authorData === 'object') {
                    // Creamos el nuevo autor con un id único generado por uuidv4
                    const newAuthor = { id: uuidv4(), ...authorData };
                    const response = authorsController.addAuthor(newAuthor);
                    socket.write(response);
                } else {
                    socket.write('Error: Datos del autor inválidos');
                }
            } else {
                socket.write('Error: Formato de JSON no válido');
            }

        // ***COMANDOS DE EDITORIALES***

        } else if (command === 'GET PUBLISHERS') {
            // Obtenemos todas las editoriales y las enviamos al cliente
            const response = publishersController.getPublishers();
            socket.write(response);

        } else if (command.startsWith('ADD PUBLISHER')) {
            // Extraemos el JSON del comando eliminando la parte 'ADD PUBLISHER '
            // Ejemplo: ADD PUBLISHER {"nombre": "Minotauro", "pais": "Argentina"}
            const publisherDataString = command.replace('ADD PUBLISHER ', '');

            if (isJSON(publisherDataString)) {
                const publisherData = JSON.parse(publisherDataString);

                if (publisherData && typeof publisherData === 'object') {
                    // Creamos la nueva editorial con un id único generado por uuidv4
                    const newPublisher = { id: uuidv4(), ...publisherData };
                    const response = publishersController.addPublisher(newPublisher);
                    socket.write(response);
                } else {
                    socket.write('Error: Datos de la editorial inválidos');
                }
            } else {
                socket.write('Error: Formato de JSON no válido');
            }

        } else {
            // Si el comando no coincide con ninguno de los anteriores
            socket.write('Comando no reconocido');
        }
    });

    // Evento que se dispara cuando el cliente se desconecta
    socket.on('end', () => {
        console.log('Cliente desconectado');
    });

    // Evento para manejar errores de conexión
    socket.on('error', (error) => {
        console.error('Error en la conexión:', error);
    });
});

// El servidor escucha en el puerto 8080
server.listen(8080, () => {
    console.log('Servidor TCP escuchando en el puerto 8080');
});