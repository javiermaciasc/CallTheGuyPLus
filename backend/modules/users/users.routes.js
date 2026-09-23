const express = require('express');
const router = express.Router();

const {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} = require('./users.controller');

// GET todos los usuarios
router.get('/', async (req, res) => {
    const data = await getUsers();
    res.json(data);
});

// GET usuario por ID
router.get('/:id', async (req, res) => {
    const data = await getUserById(req.params.id);
    res.json(data || {});
});

// POST crear usuario
router.post('/', async (req, res) => {
    const data = await createUser(req.body);
    res.json(data);
});

// PUT actualizar usuario
router.put('/:id', async (req, res) => {
    const data = await updateUser(req.params.id, req.body);
    res.json(data || {});
});

// DELETE eliminar usuario
router.delete('/:id', async (req, res) => {
    const ok = await deleteUser(req.params.id);
    res.json({ deleted: ok });
});

module.exports = router;
