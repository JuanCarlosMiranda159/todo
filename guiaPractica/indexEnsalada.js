// importar todas las librerías necesarias.
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const indexEnsaladaRouter = require("../routes/indexEnsaladas");

// determinamos el puerto Endpoint
const PORT = process.env.PORT || 10804;

// obtenemos la librería controlador de archivo
const adapter = new FileSync("dbindexEnsalada.json");
const dbindexEnsalada = low(adapter);

// inicializamos la DB
dbindexEnsalada.defaults({ indexEnsaladas: [] }).write();
const app = express(); 
app.db = dbindexEnsalada; 

// definimos las variables necesarias.
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/indexEnsaladas", indexEnsaladaRouter); 

// mostramos el log de ejecución
app.listen(PORT, () => console.log(`El servidor está corriendo en el puerto ${PORT}`));

// servicio REST (opcional)
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