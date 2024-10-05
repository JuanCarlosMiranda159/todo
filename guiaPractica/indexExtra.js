// importar todas las librerías necesarias.
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const indexExtraRouter = require("../routes/indexExtras");

// determinamos el puerto Endpoint
const PORT = process.env.PORT || 10805;

// obtenemos la librería controlador de archivo
const adapter = new FileSync("dbindexExtra.json");
const dbindexExtra = low(adapter);

// inicializamos la DB
dbindexExtra.defaults({ indexExtras: [] }).write(); 
const app = express(); 
app.db = dbindexExtra;

// definimos las variables necesarias.
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/indexExtras", indexExtraRouter); 

// mostramos el log de ejecución
app.listen(PORT, () => console.log(`El servidor está corriendo en el puerto ${PORT}`));

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Librería APIs - CERTUS",
            version: "1.0.0",
            descripcion: "Demo de Librerías de Ventas API",
        },
        servers: [
            {
                url: "http://localhost:" + PORT,
            },
        ],
    },
    apis: ["./routes/*.js"],
};