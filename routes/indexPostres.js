const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

// Obtener la lista de artículos
router.get("/", (req, res) => {
    const indexPostres = req.app.db.get("indexPostres").value(); // Cambiado de 'disable' a 'db'
    res.send(indexPostres);
});

// Obtener artículo desde la ID
router.get("/:id", (req, res) => {
    const indexPostre = req.app.db.get("indexPostres").find({ id: req.params.id }).value(); // Corrección del nombre de variable

    if (!indexPostre) { // Cambiado de 'indexPostre' a 'indexPostre'
        return res.sendStatus(404);
    }
    res.send(indexPostre);
});

// Crear un artículo nuevo
router.post("/", (req, res) => {
    try {
        const indexPostre = {
            id: nanoid(idLength),
            ...req.body,
        };
        req.app.db.get("indexPostres").push(indexPostre).write(); // Cambiado para usar 'indexPostres'

        res.send(indexPostre);
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Actualizar un artículo
router.put("/:id", (req, res) => {
    try {
        req.app.db
            .get("indexPostres")
            .find({ id: req.params.id }) // Cambiado de 'params-id' a 'params.id'
            .assign(req.body)
            .write();

        res.send(req.app.db.get("indexPostres").find({ id: req.params.id }).value());
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Eliminar un artículo por ID
router.delete("/:id", (req, res) => {
    req.app.db
        .get("indexPostres")
        .remove({ id: req.params.id })
        .write();

    res.sendStatus(200);
});

module.exports = router;