const express = require('express');
const cors = require('cors');
const path = require('path');

// Rutas (orden alfabético por carpeta)
const clientsRoutes = require('./modules/clients/clients.routes.js');
const guysRoutes = require('./modules/guys/guys.routes.js');
const ordersRoutes = require('./modules/orders/orders.routes.js');
const paymentsRoutes = require('./modules/payments/payments.routes.js');
const storesRoutes = require('./modules/stores/stores.routes.js');
const uploadsRoutes = require('./modules/uploads/uploads.routes.js');
const usersRoutes = require('./modules/users/users.routes.js');

// Middlewares
const errorMiddleware = require('./middleware/error.middleware.js');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Servir frontend y public
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '../public')));

// Rutas API (orden alfabético)
app.use('/clients', clientsRoutes);
app.use('/guys', guysRoutes);
app.use('/orders', ordersRoutes);
app.use('/payments', paymentsRoutes);
app.use('/stores', storesRoutes);
app.use('/uploads', uploadsRoutes);
app.use('/users', usersRoutes);

// Middleware de errores
app.use(errorMiddleware);

// Puerto local (Deta Space lo reemplaza automáticamente)
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor CallTheGuyPlus corriendo en http://localhost:${PORT}`);
});
