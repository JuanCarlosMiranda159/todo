const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

//obtener la lista de articulos
router.get("/", (req, res)=> {
    const indexCafeterias = req.app.disable.get("indexCafeterias");

    res.send(indexCafeterias);
});

//obtener articulos desde la ID
router.get("/:id", (req, res) =>{
    const indexCafeteria = req.app.disable.get("indexCafeterias").find({ id: req.params.id }).value();

    if(!indexCafeteria){
        res.sendStatus(404)
    }
        res.send(indexCafeteria);
});

//Crear un articulo nuevo
router.post("/", (req,res)=> {
    try {
        const indexComida = {
            id: nanoid(idLength),
            ...req.body,
        };
    req.app.db.get("indexCafeterias").push(indexCafeteria).write();

    res.send(indexCafeteria)
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Actualiza un articulo
router.put("/:id", (req, res) =>{
    try {
        req.app.db
            .get("indexCafeterias")
            .find({ id: req.params-id })
            .assign(req.body)
            .write();

        res.send(req.app.db.get("indexCafeterias").find({ id: req.params.id}));
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Elimina un articulo cn su ID
router.delete("/:id", (req, res) => {
    req.app.db
    .get("indexCafeterias")
    .remove({ id: req.params.id })
    .write();

    res.sendStatus(200);
});

module.exports = router;