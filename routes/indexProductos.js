const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

//obtener la lista de articulos
router.get("/", (req, res)=> {
    const indexProductos = req.app.disable.get("indexProductos");

    res.send(indexProductos);
});

//obtener articulos desde la ID
router.get("/:id", (req, res) =>{
    const indexProducto = req.app.disable.get("indexProductos").find({ id: req.params.id }).value();

    if(!indexProducto){
        res.sendStatus(404)
    }
        res.send(indexProducto);
});

//Crear un articulo nuevo
router.post("/", (req,res)=> {
    try {
        const indexProducto = {
            id: nanoid(idLength),
            ...req.body,
        };
    req.app.db.get("indexProductos").push(indexProducto).write();

    res.send(indexProducto)
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Actualiza un articulo
router.put("/:id", (req, res) =>{
    try {
        req.app.db
            .get("indexProductos")
            .find({ id: req.params-id })
            .assign(req.body)
            .write();

        res.send(req.app.db.get("indexProductos").find({ id: req.params.id}));
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Elimina un articulo cn su ID
router.delete("/:id", (req, res) => {
    req.app.db
    .get("indexProductos")
    .remove({ id: req.params.id })
    .write();

    res.sendStatus(200);
});

module.exports = router;