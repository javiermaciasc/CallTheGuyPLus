// backend/routes/guyplus.routes.js

import { Router } from 'express';

import {
  createVendor,
  getVendor,
  updateVendor,
  deleteVendor,
  listVendors
} from '../controllers/guyplus.controller.js';

import {
  createVendorOrder,
  getVendorOrder,
  updateVendorOrder,
  deleteVendorOrder,
  listVendorOrders
} from '../controllers/guyplus.orders.controller.js';

import {
  createVendorBenefit,
  getVendorBenefit,
  updateVendorBenefit,
  deleteVendorBenefit,
  listVendorBenefits
} from '../controllers/guyplus.benefits.controller.js';

import {
  createVendorPayment,
  getVendorPayment,
  updateVendorPayment,
  deleteVendorPayment,
  listVendorPayments
} from '../controllers/guyplus.payments.controller.js';

const router = Router();

/**
 * ============================================
 *   RUTAS: VENDORS (GUY PLUS)
 * ============================================
 */
router.post('/vendors', createVendor);
router.get('/vendors/:id', getVendor);
router.put('/vendors/:id', updateVendor);
router.delete('/vendors/:id', deleteVendor);
router.get('/vendors', listVendors);

/**
 * ============================================
 *   RUTAS: ORDENES DE VENDORS (GUY PLUS)
 * ============================================
 */
router.post('/orders', createVendorOrder);
router.get('/orders/:id', getVendorOrder);
router.put('/orders/:id', updateVendorOrder);
router.delete('/orders/:id', deleteVendorOrder);
router.get('/orders', listVendorOrders);

/**
 * ============================================
 *   RUTAS: BENEFICIOS DE VENDORS (GUY PLUS)
 * ============================================
 */
router.post('/benefits', createVendorBenefit);
router.get('/benefits/:id', getVendorBenefit);
router.put('/benefits/:id', updateVendorBenefit);
router.delete('/benefits/:id', deleteVendorBenefit);
router.get('/benefits', listVendorBenefits);

/**
 * ============================================
 *   RUTAS: PAGOS A VENDORS (GUY PLUS)
 * ============================================
 */
router.post('/payments', createVendorPayment);
router.get('/payments/:id', getVendorPayment);
router.put('/payments/:id', updateVendorPayment);
router.delete('/payments/:id', deleteVendorPayment);
router.get('/payments', listVendorPayments);

export default router;
