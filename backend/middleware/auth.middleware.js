const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'dev_secret_key';

// Middleware de autenticación
async function authMiddleware(req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ error: 'Token requerido' });
    }

    const token = header.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded; // Guarda el usuario decodificado
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido' });
    }
}

module.exports = authMiddleware;
