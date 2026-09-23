const express = require('express');
const router = express.Router();

const {
    getGuys,
    createGuy,
    getGuyById,
    updateGuy,
    deleteGuy
} = require('./guys.controller');

// GET todos los Guys
router.get('/', async (req, res) => {
    const data = await getGuys();
    res.json(data);
});

// GET Guy por ID
router.get('/:id', async (req, res) => {
    const data = await getGuyById(req.params.id);
    res.json(data || {});
});

// POST crear Guy
router.post('/', async (req, res) => {
    const data = await createGuy(req.body);
    res.json(data);
});

// PUT actualizar Guy
router.put('/:id', async (req, res) => {
    const data = await updateGuy(req.params.id, req.body);
    res.json(data || {});
});

// DELETE eliminar Guy
router.delete('/:id', async (req, res) => {
    const ok = await deleteGuy(req.params.id);
    res.json({ deleted: ok });
});

module.exports = router;
