const express = require('express');
const router = express.Router();

const {
    getOrders,
    createOrder,
    getOrderById,
    updateOrder,
    confirmPayment,
    deleteOrder
} = require('./orders.controller');

// GET todas las órdenes
router.get('/', async (req, res) => {
    const data = await getOrders();
    res.json(data);
});

// GET orden por ID
router.get('/:id', async (req, res) => {
    const data = await getOrderById(req.params.id);
    res.json(data || {});
});

// POST crear orden (y factura con mismo número)
router.post('/', async (req, res) => {
    const data = await createOrder(req.body);
    res.json(data);
});

// PUT actualizar orden
router.put('/:id', async (req, res) => {
    const data = await updateOrder(req.params.id, req.body);
    res.json(data || {});
});

// POST confirmar pago → libera factura
router.post('/:id/confirm-payment', async (req, res) => {
    const data = await confirmPayment(req.params.id);
    res.json(data || {});
});

// DELETE eliminar orden (y factura asociada)
router.delete('/:id', async (req, res) => {
    const ok = await deleteOrder(req.params.id);
    res.json({ deleted: ok });
});

module.exports = router;
