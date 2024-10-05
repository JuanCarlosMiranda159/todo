const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

// Obtener la lista de ensaladas
router.get("/", (req, res) => {
    const indexEnsaladas = req.app.db.get("indexEnsaladas").value(); // Asegúrate de que sea 'indexEnsaladas'
    res.send(indexEnsaladas);
});

// Obtener ensalada desde la ID
router.get("/:id", (req, res) => {
    const indexEnsalada = req.app.db.get("indexEnsaladas").find({ id: req.params.id }).value();

    if (!indexEnsalada) {
        return res.sendStatus(404);
    }
    res.send(indexEnsalada);
});

// Crear una ensalada nueva
router.post("/", (req, res) => {
    try {
        const indexEnsalada = {
            id: nanoid(idLength),
            ...req.body,
        };
        req.app.db.get("indexEnsaladas").push(indexEnsalada).write();

        res.send(indexEnsalada);
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Actualizar una ensalada
router.put("/:id", (req, res) => {
    try {
        req.app.db
            .get("indexEnsaladas")
            .find({ id: req.params.id }) // Cambiado de 'params-id' a 'params.id'
            .assign(req.body)
            .write();

        res.send(req.app.db.get("indexEnsaladas").find({ id: req.params.id }).value());
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Eliminar una ensalada por ID
router.delete("/:id", (req, res) => {
    req.app.db
        .get("indexEnsaladas")
        .remove({ id: req.params.id })
        .write();

    res.sendStatus(200);
});

module.exports = router;