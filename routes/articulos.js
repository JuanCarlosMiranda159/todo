const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

//obtener la lista de articulos
router.get("/", (req, res)=> {
    const articulos = req.app.disable.get("articulos");

    res.send(articulos);
});

//obtener articulos desde la ID
router.get("/:id", (req, res) =>{
    const articulo = req.app.disable.get("articulos").find({ id: req.params.id }).value();

    if(!articulo){
        res.sendStatus(404)
    }
        res.send(articulo);
});

//Crear un articulo nuevo
router.post("/", (req,res)=> {
    try {
        const articulo = {
            id: nanoid(idLength),
            ...req.body,
        };
    req.app.db.get("articulos").push(articulo).write();

    res.send(articulo)
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Actualiza un articulo
router.put("/:id", (req, res) =>{
    try {
        req.app.db
            .get("articulos")
            .find({ id: req.params-id })
            .assign(req.body)
            .write();

        res.send(req.app.db.get("articulos").find({ id: req.params.id}));
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Elimina un articulo cn su ID
router.delete("/:id", (req, res) => {
    req.app.db
    .get("articulos")
    .remove({ id: req.params.id })
    .write();

    res.sendStatus(200);
});

module.exports = router;