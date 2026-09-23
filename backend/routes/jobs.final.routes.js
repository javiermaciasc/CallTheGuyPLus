// backend/routes/jobs.final.routes.js

/**
 * ============================================
 *   RUTAS: FOTOS FINALES DEL TRABAJO
 *   SECCIÓN 7 — Guy sube fotos finales (OBLIGATORIAS)
 * ============================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import express from 'express';

import {
  uploadFinalPhotosController,
  getFinalPhotosByJobController,
  getFinalPhotosByGuyController
} from '../controllers/jobs.final.controller.js';

const router = express.Router();

/**
 * ============================================
 *   SUBIR FOTOS FINALES DEL TRABAJO
 *   POST /jobs/final/upload
 * ============================================
 */
router.post('/upload', uploadFinalPhotosController);

/**
 * ============================================
 *   OBTENER FOTOS FINALES POR JOB
 *   GET /jobs/final/job/:jobId
 * ============================================
 */
router.get('/job/:jobId', getFinalPhotosByJobController);

/**
 * ============================================
 *   OBTENER FOTOS FINALES POR GUY
 *   GET /jobs/final/guy/:guyId
 * ============================================
 */
router.get('/guy/:guyId', getFinalPhotosByGuyController);

/**
 * ============================================
 *   EXPORTAR RUTAS
 * ============================================
 */
export default router;
