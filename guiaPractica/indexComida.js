// importar todas las librerías necesarias
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const indexComidaRouter = require("../routes/indexComidas");

// determinamos el puerto Endpoint
const PORT = process.env.PORT || 10803;

// creamos el archivo db.json
const adapter = new FileSync("dbindexComida.json");
const dbindexComida = low(adapter);

// inicializamos la DB
dbindexComida.defaults({ indexComida: [] }).write();

const app = express(); // creamos el aplicativo
app.dbindexComida = dbindexComida;

// definimos las variables necesarias
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/indexComidas", indexComidaRouter); // Enrutamiento

// mostramos el log de ejecución
app.listen(PORT, () => console.log(`El servidor está corriendo en el puerto ${PORT}`));

// servicio REST
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Librería APIs - CERTUS",
            version: "1.0.0",
            description: "Demo de Librerías de Ventas API",
        },
        servers: [
            {
                url: "http://localhost:" + PORT,
            },
        ],
    },
    apis: ["./routes/*.js"],
};