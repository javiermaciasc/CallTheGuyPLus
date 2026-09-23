// backend/routes/invoice.routes.js

/**
 * ============================================================
 *   RUTAS: FACTURA BASADA EN PO
 *   SECCIÓN 11 — Mostrar factura
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import express from 'express';

import {
  getInvoiceByPOController,
  getInvoiceByIdController,
  getAllInvoicesController
} from '../controllers/invoice.controller.js';

const router = express.Router();

/**
 * ============================================================
 *   OBTENER FACTURA POR PO
 *   GET /invoice/po/:poNumber
 * ============================================================
 */
router.get('/po/:poNumber', getInvoiceByPOController);

/**
 * ============================================================
 *   OBTENER FACTURA POR ID
 *   GET /invoice/:invoiceId
 * ============================================================
 */
router.get('/:invoiceId', getInvoiceByIdController);

/**
 * ============================================================
 *   OBTENER TODAS LAS FACTURAS
 *   GET /invoice/all
 * ============================================================
 */
router.get('/all', getAllInvoicesController);

/**
 * ============================================================
 *   EXPORTAR RUTAS
 * ============================================================
 */
export default router;
