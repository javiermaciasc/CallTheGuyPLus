const express = require('express');
const router = express.Router();

const {
    getPayments,
    createPayment,
    getPaymentById,
    deletePayment
} = require('./payments.controller');

// GET todos los pagos
router.get('/', async (req, res) => {
    const data = await getPayments();
    res.json(data);
});

// GET pago por ID
router.get('/:id', async (req, res) => {
    const data = await getPaymentById(req.params.id);
    res.json(data || {});
});

// POST registrar pago → libera factura
router.post('/', async (req, res) => {
    const data = await createPayment(req.body);
    res.json(data);
});

// DELETE eliminar pago
router.delete('/:id', async (req, res) => {
    const ok = await deletePayment(req.params.id);
    res.json({ deleted: ok });
});

module.exports = router;
