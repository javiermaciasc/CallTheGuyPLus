const express = require('express');
const router = express.Router();

const {
    getStores,
    createStore,
    getStoreById,
    updateStore,
    deleteStore
} = require('./stores.controller');

// GET todas las tiendas
router.get('/', async (req, res) => {
    const data = await getStores();
    res.json(data);
});

// GET tienda por ID
router.get('/:id', async (req, res) => {
    const data = await getStoreById(req.params.id);
    res.json(data || {});
});

// POST crear tienda
router.post('/', async (req, res) => {
    const data = await createStore(req.body);
    res.json(data);
});

// PUT actualizar tienda
router.put('/:id', async (req, res) => {
    const data = await updateStore(req.params.id, req.body);
    res.json(data || {});
});

// DELETE eliminar tienda
router.delete('/:id', async (req, res) => {
    const ok = await deleteStore(req.params.id);
    res.json({ deleted: ok });
});

module.exports = router;
