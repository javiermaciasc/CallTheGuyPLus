// backend/routes/jobs.initial.routes.js

import { Router } from 'express';

import {
  uploadInitialPhotos,
  saveInitialNotes,
  getInitialPhotos,
  getInitialNotes
} from '../controllers/jobs.initial.controller.js';

const router = Router();

/**
 * ============================================
 *   RUTA: SUBIR FOTOS INICIALES DEL CLIENTE
 * ============================================
 *   POST /jobs/:jobId/initial/photos
 * ============================================
 */
router.post('/jobs/:jobId/initial/photos', uploadInitialPhotos);

/**
 * ============================================
 *   RUTA: GUARDAR NOTAS INICIALES DEL CLIENTE
 * ============================================
 *   POST /jobs/:jobId/initial/notes
 * ============================================
 */
router.post('/jobs/:jobId/initial/notes', saveInitialNotes);

/**
 * ============================================
 *   RUTA: MOSTRAR FOTOS INICIALES DEL CLIENTE
 * ============================================
 *   GET /jobs/:jobId/initial/photos
 * ============================================
 */
router.get('/jobs/:jobId/initial/photos', getInitialPhotos);

/**
 * ============================================
 *   RUTA: MOSTRAR NOTAS INICIALES DEL CLIENTE
 * ============================================
 *   GET /jobs/:jobId/initial/notes
 * ============================================
 */
router.get('/jobs/:jobId/initial/notes', getInitialNotes);

export default router;
