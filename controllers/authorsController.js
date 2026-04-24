// Importamos el modelo de autores para poder leer y escribir datos
const authorsModel = require('../models/authorsModel');

// Importamos la vista para formatear las respuestas
const responseFormatter = require('../views/responseFormatter');

const authorsController = {

    // Función para obtener todos los autores
    getAuthors: () => {
        // Llamamos al modelo para leer los autores del archivo JSON
        const authors = authorsModel.readAuthors();
        // Devolvemos los autores formateados con la vista
        return responseFormatter.formatResponse(authors);
    },

    // Función para agregar un nuevo autor
    // recibe como parámetro 'newAuthor' que es el autor a agregar
    addAuthor: (newAuthor) => {
        // Leemos la lista actual de autores
        const authors = authorsModel.readAuthors();
        // Agregamos el nuevo autor a la lista
        authors.push(newAuthor);
        // Guardamos la lista actualizada en el archivo JSON
        authorsModel.writeAuthors(authors);
        // Devolvemos un mensaje de éxito formateado con la vista
        return responseFormatter.formatResponse({ message: 'Autor agregado exitosamente' });
    }
};

// Exportamos el controller para usarlo en el servidor
module.exports = authorsController;