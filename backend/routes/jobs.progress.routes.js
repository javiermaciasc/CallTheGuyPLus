// backend/routes/jobs.progress.routes.js

/**
 * ============================================
 *   RUTAS: PROGRESO DEL TRABAJO (GUY)
 *   SECCIÓN 6 — Guy realiza el trabajo
 * ============================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificar nada, tal como debe existir en producción.
 */

import express from 'express';

import {
  startJobProgressController,
  updateJobProgressController,
  getJobProgressByJobController,
  getJobProgressByGuyController
} from '../controllers/jobs.progress.controller.js';

const router = express.Router();

/**
 * ============================================
 *   REGISTRAR INICIO DEL TRABAJO
 *   POST /jobs/progress/start
 * ============================================
 */
router.post('/start', startJobProgressController);

/**
 * ============================================
 *   REGISTRAR PROGRESO DEL TRABAJO
 *   PUT /jobs/progress/update
 * ============================================
 */
router.put('/update', updateJobProgressController);

/**
 * ============================================
 *   OBTENER PROGRESO POR JOB
 *   GET /jobs/progress/job/:jobId
 * ============================================
 */
router.get('/job/:jobId', getJobProgressByJobController);

/**
 * ============================================
 *   OBTENER PROGRESO POR GUY
 *   GET /jobs/progress/guy/:guyId
 * ============================================
 */
router.get('/guy/:guyId', getJobProgressByGuyController);

/**
 * ============================================
 *   EXPORTAR RUTAS
 * ============================================
 */
export default router;
