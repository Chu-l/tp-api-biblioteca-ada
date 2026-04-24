// Importamos el módulo 'fs' (File System), nos permite leer y escribir archivos en el sistema
const fs = require('fs');
// Importamos el módulo 'path' que nos ayuda a construir rutas de archivos de forma correcta
const path = require('path');

// Ruta al archivo JSON de libros
const filePath = path.join(__dirname, '../data/books.json');

// Creamos un objeto llamado booksModel con dos funciones
const booksModel = {
    // Función para LEER los libros del archivo JSON
    readBooks: () => {
        try { // Leemos el archivo de forma sincrónica
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);  // Convertimos el texto JSON a un objeto JavaScript y lo devolvemos
        } catch (error) { // Si algo sale mal mostramos el error
            console.error('Error al leer los libros:', error);
            return []; // Devolvemos un array vacío para que el programa no se rompa
        }
    },
    // Función para ESCRIBIR libros en el archivo JSON
    // recibe como parámetro 'books' que es la lista actualizada de libros
    writeBooks: (books) => {
        try { // Escribimos en el archivo convirtiendo el objeto JavaScript a texto JSON
            fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
        } catch (error) { // Si algo sale mal mostramos el error
            console.error('Error al escribir los libros:', error);
        }
    }
};

// Exportamos el modelo para poder usarlo en los controllers
module.exports = booksModel;