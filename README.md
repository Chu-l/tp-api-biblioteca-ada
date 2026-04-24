# API de Gestión de Biblioteca 📚

API desarrollada con Node.js para gestionar una biblioteca usando un servidor TCP.

## Tecnologías utilizadas
- Node.js
- Módulo NET (servidor TCP)
- Módulo FS (manejo de archivos)
- UUID (generación de IDs únicos)

## Cómo instalar el proyecto

1. Cloná el repositorio:
git clone https://github.com/Chu-l/tp-api-biblioteca-ada.git

2. Entrá a la carpeta:
cd tp-api-biblioteca-ada

3. Instalá las dependencias:
npm install

## Cómo ejecutar el proyecto

1. Iniciá el servidor en una terminal:
npm start

2. Abrí una segunda terminal y ejecutá el cliente:
node client.js

## Estructura del proyecto

```
tp-api-biblioteca-ada/
├── controllers/
│   ├── booksController.js
│   ├── authorsController.js
│   └── publishersController.js
├── models/
│   ├── booksModel.js
│   ├── authorsModel.js
│   └── publishersModel.js
├── views/
│   └── responseFormatter.js
├── data/
│   ├── books.json
│   ├── authors.json
│   └── publishers.json
├── server.js
├── client.js
└── package.json
```

## Cómo probar cada funcionalidad

Cada vez que querés probar un comando tenés que abrir el cliente de nuevo con `node client.js`.

### Probar libros
1. Listar todos los libros:
```GET BOOKS```

2. Agregar un nuevo libro:
```ADD BOOK {"titulo": "Dune", "autorId": "1", "editorialId": "1", "anio": 1965}```

### Probar autores
1. Listar todos los autores:
```GET AUTHORS```

2. Agregar un nuevo autor:
```ADD AUTHOR {"nombre": "Brandon Sanderson", "nacionalidad": "Estadounidense"}```

### Probar editoriales
1. Listar todas las editoriales:
```GET PUBLISHERS```

2. Agregar una nueva editorial:
```ADD PUBLISHER {"nombre": "Minotauro", "pais": "Argentina"}```

### Probar manejo de errores
1. Comando inexistente:
```HOLA```
Respuesta esperada: Comando no reconocido

2. JSON mal formado:
```ADD BOOK titulo: Dune```
Respuesta esperada: Error: Formato de JSON no válido
