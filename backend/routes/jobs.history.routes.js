// backend/routes/jobs.history.routes.js

/**
 * ============================================================
 *   RUTAS: HISTORIAL DE TRABAJO PERMANENTE
 *   SECCIÓN 12 — Trabajo permanente (NO se borra jamás)
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import express from 'express';

import {
  getHistoryByClientController,
  getHistoryByGuyController,
  getHistoryByJobController
} from '../controllers/jobs.history.controller.js';

const router = express.Router();

/**
 * ============================================================
 *   OBTENER HISTORIAL POR CLIENTE
 *   GET /history/client/:clientId
 * ============================================================
 */
router.get('/client/:clientId', getHistoryByClientController);

/**
 * ============================================================
 *   OBTENER HISTORIAL POR GUY
 *   GET /history/guy/:guyId
 * ============================================================
 */
router.get('/guy/:guyId', getHistoryByGuyController);

/**
 * ============================================================
 *   OBTENER HISTORIAL POR JOB
 *   GET /history/job/:jobId
 * ============================================================
 */
router.get('/job/:jobId', getHistoryByJobController);

/**
 * ============================================================
 *   EXPORTAR RUTAS
 * ============================================================
 */
export default router;
