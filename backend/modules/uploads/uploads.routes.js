const express = require('express');
const router = express.Router();

const {
    getUploads,
    createUpload,
    getUploadById,
    updateUpload,
    deleteUpload
} = require('./uploads.controller');

// GET todos los uploads
router.get('/', async (req, res) => {
    const data = await getUploads();
    res.json(data);
});

// GET upload por ID
router.get('/:id', async (req, res) => {
    const data = await getUploadById(req.params.id);
    res.json(data || {});
});

// POST crear upload
router.post('/', async (req, res) => {
    const data = await createUpload(req.body);
    res.json(data);
});

// PUT actualizar upload
router.put('/:id', async (req, res) => {
    const data = await updateUpload(req.params.id, req.body);
    res.json(data || {});
});

// DELETE eliminar upload
router.delete('/:id', async (req, res) => {
    const ok = await deleteUpload(req.params.id);
    res.json({ deleted: ok });
});

module.exports = router;
