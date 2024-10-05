const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

// Obtener la lista de artículos
router.get("/", (req, res) => {
    const indexExtras = req.app.db.get("indexExtras").value(); // Cambiado de 'disable' a 'db'
    res.send(indexExtras);
});

// Obtener artículo desde la ID
router.get("/:id", (req, res) => {
    const indexExtra = req.app.db.get("indexExtras").find({ id: req.params.id }).value(); // Corrección del nombre de variable

    if (!indexExtra) { // Cambiado de 'indexPostre' a 'indexExtra'
        return res.sendStatus(404);
    }
    res.send(indexExtra);
});

// Crear un artículo nuevo
router.post("/", (req, res) => {
    try {
        const indexExtra = {
            id: nanoid(idLength),
            ...req.body,
        };
        req.app.db.get("indexExtras").push(indexExtra).write(); // Cambiado para usar 'indexExtras'

        res.send(indexExtra);
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Actualizar un artículo
router.put("/:id", (req, res) => {
    try {
        req.app.db
            .get("indexExtras")
            .find({ id: req.params.id }) // Cambiado de 'params-id' a 'params.id'
            .assign(req.body)
            .write();

        res.send(req.app.db.get("indexExtras").find({ id: req.params.id }).value());
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Eliminar un artículo por ID
router.delete("/:id", (req, res) => {
    req.app.db
        .get("indexExtras")
        .remove({ id: req.params.id })
        .write();

    res.sendStatus(200);
});

module.exports = router;