const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

// Obtener la lista de artículos
router.get("/", (req, res) => {
    const indexPedidos = req.app.db.get("indexPedidos").value(); // Cambiado de 'disable' a 'db'
    res.send(indexPedidos);
});

// Obtener artículo desde la ID
router.get("/:id", (req, res) => {
    const indexPedido = req.app.db.get("indexPedidos").find({ id: req.params.id }).value(); // Corrección del nombre de variable

    if (!indexPedido) { // Cambiado de 'indexPostre' a 'indexPedido'
        return res.sendStatus(404);
    }
    res.send(indexPedido);
});

// Crear un artículo nuevo
router.post("/", (req, res) => {
    try {
        const indexPedido = {
            id: nanoid(idLength),
            ...req.body,
        };
        req.app.db.get("indexPedidos").push(indexPedido).write(); // Cambiado para usar 'indexPedidos'

        res.send(indexPedido);
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Actualizar un artículo
router.put("/:id", (req, res) => {
    try {
        req.app.db
            .get("indexPedidos")
            .find({ id: req.params.id }) // Cambiado de 'params-id' a 'params.id'
            .assign(req.body)
            .write();

        res.send(req.app.db.get("indexPedidos").find({ id: req.params.id }).value());
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Eliminar un artículo por ID
router.delete("/:id", (req, res) => {
    req.app.db
        .get("indexPedidos")
        .remove({ id: req.params.id })
        .write();

    res.sendStatus(200);
});

module.exports = router;