// importar todas las librerías necesarias.
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const indexPostreRouter = require("../routes/indexPostres");

// determinamos el puerto Endpoint
const PORT = process.env.PORT || 10807;

// obtenemos la librería controlador de archivo
const adapter = new FileSync("dbindexPostre.json");
const dbindexPostre = low(adapter);

// inicializamos la DB
dbindexPostre.defaults({ indexPostres: [] }).write();
const app = express(); 
app.db = dbindexPostre; 

// definimos las variables necesarias.
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/indexPostres", indexPostreRouter); 

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
