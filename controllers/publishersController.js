// Importamos el modelo de editoriales para poder leer y escribir datos
const publishersModel = require('../models/publishersModel');

// Importamos la vista para formatear las respuestas
const responseFormatter = require('../views/responseFormatter');

const publishersController = {

    // Función para obtener todas las editoriales
    getPublishers: () => {
        // Llamamos al modelo para leer las editoriales del archivo JSON
        const publishers = publishersModel.readPublishers();
        // Devolvemos las editoriales formateadas con la vista
        return responseFormatter.formatResponse(publishers);
    },

    // Función para agregar una nueva editorial
    // recibe como parámetro 'newPublisher' que es la editorial a agregar
    addPublisher: (newPublisher) => {
        // Leemos la lista actual de editoriales
        const publishers = publishersModel.readPublishers();
        // Agregamos la nueva editorial a la lista
        publishers.push(newPublisher);
        // Guardamos la lista actualizada en el archivo JSON
        publishersModel.writePublishers(publishers);
        // Devolvemos un mensaje de éxito formateado con la vista
        return responseFormatter.formatResponse({ message: 'Editorial agregada exitosamente' });
    }
};

// Exportamos el controller para usarlo en el servidor
module.exports = publishersController;