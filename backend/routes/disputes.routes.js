// backend/routes/disputes.routes.js

/**
 * ============================================
 *   RUTAS: DISPUTAS
 *   SECCIÓN 8 — Cliente abre disputa / Guy responde
 * ============================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import express from 'express';

import {
  createDisputeController,
  respondDisputeController,
  getDisputeByJobController,
  getDisputesByClientController,
  getDisputesByGuyController
} from '../controllers/disputes.controller.js';

const router = express.Router();

/**
 * ============================================
 *   CREAR DISPUTA (CLIENTE)
 *   POST /disputes/create
 * ============================================
 */
router.post('/create', createDisputeController);

/**
 * ============================================
 *   RESPONDER DISPUTA (GUY)
 *   PUT /disputes/respond
 * ============================================
 */
router.put('/respond', respondDisputeController);

/**
 * ============================================
 *   OBTENER DISPUTA POR JOB
 *   GET /disputes/job/:jobId
 * ============================================
 */
router.get('/job/:jobId', getDisputeByJobController);

/**
 * ============================================
 *   OBTENER DISPUTAS POR CLIENTE
 *   GET /disputes/client/:clientId
 * ============================================
 */
router.get('/client/:clientId', getDisputesByClientController);

/**
 * ============================================
 *   OBTENER DISPUTAS POR GUY
 *   GET /disputes/guy/:guyId
 * ============================================
 */
router.get('/guy/:guyId', getDisputesByGuyController);

/**
 * ============================================
 *   EXPORTAR RUTAS
 * ============================================
 */
export default router;
