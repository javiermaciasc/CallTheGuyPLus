// Middleware global de manejo de errores

function errorMiddleware(err, req, res, next) {
    console.error('🔥 ERROR:', err);

    const status = err.status || 500;

    res.status(status).json({
        ok: false,
        message: err.message || 'Error interno del servidor',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
}

module.exports = errorMiddleware;
