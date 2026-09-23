const express = require('express');
const router = express.Router();

const {
    getClients,
    createClient,
    getClientById,
    updateClient,
    deleteClient
} = require('./clients.controller');

// GET todos los clientes
router.get('/', async (req, res) => {
    const data = await getClients();
    res.json(data);
});

// GET cliente por ID
router.get('/:id', async (req, res) => {
    const data = await getClientById(req.params.id);
    res.json(data || {});
});

// POST crear cliente
router.post('/', async (req, res) => {
    const data = await createClient(req.body);
    res.json(data);
});

// PUT actualizar cliente
router.put('/:id', async (req, res) => {
    const data = await updateClient(req.params.id, req.body);
    res.json(data || {});
});

// DELETE eliminar cliente
router.delete('/:id', async (req, res) => {
    const ok = await deleteClient(req.params.id);
    res.json({ deleted: ok });
});

module.exports = router;
