// backend/routes/payments.routes.js

import { Router } from 'express';

import {
  registerPayment,
  confirmPayment,
  getPaymentsByClient,
  getPaymentsByGuy
} from '../controllers/payments.controller.js';

const router = Router();

/**
 * ============================================
 *   REGISTRAR PAGO (CLIENTE → GUY)
 * ============================================
 */
router.post('/payments', registerPayment);

/**
 * ============================================
 *   CONFIRMACIÓN DEL GUY
 * ============================================
 */
router.post('/payments/confirm/:id', confirmPayment);

/**
 * ============================================
 *   OBTENER PAGOS POR CLIENTE
 * ============================================
 */
router.get('/payments/client/:clientId', getPaymentsByClient);

/**
 * ============================================
 *   OBTENER PAGOS POR GUY
 * ============================================
 */
router.get('/payments/guy/:guyId', getPaymentsByGuy);

export default router;
