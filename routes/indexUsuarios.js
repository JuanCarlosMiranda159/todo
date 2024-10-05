const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

// Obtener la lista de artículos
router.get("/", (req, res) => {
    const indexUsuarios = req.app.db.get("indexUsuarios").value(); // Cambiado de 'disable' a 'db'
    res.send(indexUsuarios);
});

// Obtener artículo desde la ID
router.get("/:id", (req, res) => {
    const indexUsuario = req.app.db.get("indexUsuarios").find({ id: req.params.id }).value(); // Corrección del nombre de variable

    if (!indexUsuario) { // Verificación de existencia
        return res.sendStatus(404);
    }
    res.send(indexUsuario);
});

// Crear un artículo nuevo
router.post("/", (req, res) => {
    try {
        const indexUsuario = {
            id: nanoid(idLength),
            ...req.body,
        };
        req.app.db.get("indexUsuarios").push(indexUsuario).write(); // Cambiado para usar 'indexUsuarios'

        res.send(indexUsuario);
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Actualizar un artículo
router.put("/:id", (req, res) => {
    try {
        req.app.db
            .get("indexUsuarios")
            .find({ id: req.params.id }) // Cambiado de 'params-id' a 'params.id'
            .assign(req.body)
            .write();

        res.send(req.app.db.get("indexUsuarios").find({ id: req.params.id }).value());
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Eliminar un artículo por ID
router.delete("/:id", (req, res) => {
    req.app.db
        .get("indexUsuarios")
        .remove({ id: req.params.id })
        .write();

    res.sendStatus(200);
});

module.exports = router;