const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

// Obtener la lista de comidas
router.get("/", (req, res) => {
    const indexComidas = req.app.dbindexComida.get("indexComida").value();
    res.send(indexComidas);
});

// Obtener comida por ID
router.get("/:id", (req, res) => {
    const indexComida = req.app.dbindexComida.get("indexComida").find({ id: req.params.id }).value();
    if (!indexComida) {
        return res.sendStatus(404);
    }
    res.send(indexComida);
});

// Crear una comida nueva
router.post("/", (req, res) => {
    try {
        const indexComida = {
            id: nanoid(idLength),
            ...req.body,
        };
        req.app.dbindexComida.get("indexComida").push(indexComida).write();
        res.send(indexComida);
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Actualizar una comida
router.put("/:id", (req, res) => {
    try {
        const updatedComida = req.app.dbindexComida
            .get("indexComida")
            .find({ id: req.params.id })
            .assign(req.body)
            .write();

        res.send(req.app.dbindexComida.get("indexComida").find({ id: req.params.id }).value());
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Eliminar una comida por ID
router.delete("/:id", (req, res) => {
    req.app.dbindexComida.get("indexComida")
        .remove({ id: req.params.id })
        .write();

    res.sendStatus(200);
});

module.exports = router;