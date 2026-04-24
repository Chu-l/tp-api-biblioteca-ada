// Importamos el modelo de libros para poder leer y escribir datos
const booksModel = require('../models/booksModel');

// Importamos la vista para formatear las respuestas
const responseFormatter = require('../views/responseFormatter');

const booksController = {

    // Función para obtener todos los libros
    getBooks: () => {
        // Llamamos al modelo para leer los libros del archivo JSON
        const books = booksModel.readBooks();
        // Devolvemos los libros formateados con la vista
        return responseFormatter.formatResponse(books);
    },

    // Función para agregar un nuevo libro
    // recibe como parámetro 'newBook' que es el libro a agregar
    addBook: (newBook) => {
        // Leemos la lista actual de libros
        const books = booksModel.readBooks();
        // Agregamos el nuevo libro a la lista
        books.push(newBook);
        // Guardamos la lista actualizada en el archivo JSON
        booksModel.writeBooks(books);
        // Devolvemos un mensaje de éxito formateado con la vista
        return responseFormatter.formatResponse({ message: 'Libro agregado exitosamente' });
    }
};

// Exportamos el controller para usarlo en el servidor
module.exports = booksController;