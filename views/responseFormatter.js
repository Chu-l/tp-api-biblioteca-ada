// ***Vista para formatear las respuestas***
const responseFormatter = { //Creamos un objeto llamado responseFormatter
    formatResponse: (data) => { // se define una funcion dentro del objeto
        return JSON.stringify(data, null, 2); //convierte un objeto JavaScript a texto JSON
    }
};

// ***Exportamos la vista para usarla en los controladores***
module.exports = responseFormatter;