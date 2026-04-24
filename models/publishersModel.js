// Importamos el módulo 'fs' (File System) que nos permite leer y escribir archivos en el sistema
const fs = require('fs');

// Importamos el módulo 'path' que nos ayuda a construir rutas de archivos de forma correcta
const path = require('path');

// Construimos la ruta al archivo publishers.json
const filePath = path.join(__dirname, '../data/publishers.json');

// Creamos un objeto llamado publishersModel con dos funciones
const publishersModel = {

    // Función para LEER las editoriales del archivo JSON
    readPublishers: () => {
        try {
            // Leemos el archivo de forma sincrónica (espera a que termine antes de continuar)
            // 'utf8' indica que el archivo está en formato de texto
            const data = fs.readFileSync(filePath, 'utf8');

            // Convertimos el texto JSON a un objeto JavaScript y lo devolvemos
            return JSON.parse(data);
        } catch (error) {
            // Si algo sale mal mostramos el error
            console.error('Error al leer las editoriales:', error);
            // Devolvemos un array vacío para que el programa no se rompa
            return [];
        }
    },

    // Función para ESCRIBIR editoriales en el archivo JSON
    // recibe como parámetro 'publishers' que es la lista actualizada de editoriales
    writePublishers: (publishers) => {
        try {
            // Escribimos en el archivo convirtiendo el objeto JavaScript a texto JSON
            // null y 2 son para que el JSON se vea prolijo con indentación
            fs.writeFileSync(filePath, JSON.stringify(publishers, null, 2));
        } catch (error) {
            // Si algo sale mal mostramos el error
            console.error('Error al escribir las editoriales:', error);
        }
    }
};

// Exportamos el modelo para poder usarlo en los controllers
module.exports = publishersModel;