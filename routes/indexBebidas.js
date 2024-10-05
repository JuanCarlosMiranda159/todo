const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

// Obtener la lista de bebidas
router.get("/", (req, res) => {
    const indexBebidas = req.app.dbindexBebida.get("indexBebida").value(); // Correcto
    res.send(indexBebidas);
});

// Obtener bebida por ID
router.get("/:id", (req, res) => {
    const indexBebida = req.app.dbindexBebida.get("indexBebida").find({ id: req.params.id }).value();
    if (!indexBebida) {
        return res.sendStatus(404);
    }
    res.send(indexBebida);
});

// Crear una bebida nueva
router.post("/", (req, res) => {
    try {
        const indexBebida = {
            id: nanoid(idLength),
            ...req.body,
        };
        req.app.dbindexBebida.get("indexBebida").push(indexBebida).write();
        res.send(indexBebida);
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Actualizar una bebida
router.put("/:id", (req, res) => {
    try {
        req.app.dbindexBebida.get("indexBebida")
            .find({ id: req.params.id }) // Corregido
            .assign(req.body)
            .write();

        res.send(req.app.dbindexBebida.get("indexBebida").find({ id: req.params.id }).value());
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Eliminar una bebida por ID
router.delete("/:id", (req, res) => {
    req.app.dbindexBebida.get("indexBebida")
        .remove({ id: req.params.id })
        .write();

    res.sendStatus(200);
});

module.exports = router;