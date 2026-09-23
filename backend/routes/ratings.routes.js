// backend/routes/ratings.routes.js

/**
 * ============================================================
 *   RUTAS: RATINGS
 *   SECCIÓN 9 — Calificación del cliente hacia el Guy
 *   SECCIÓN 10 — Calificación del Guy hacia el cliente
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import express from 'express';

import {
  createRatingController,
  getRatingsForGuyController,
  getRatingsForClientController
} from '../controllers/ratings.controller.js';

const router = express.Router();

/**
 * ============================================================
 *   CREAR RATING (CLIENTE → GUY o GUY → CLIENTE)
 *   POST /ratings/create
 * ============================================================
 */
router.post('/create', createRatingController);

/**
 * ============================================================
 *   OBTENER RATINGS RECIBIDOS POR UN GUY
 *   GET /ratings/guy/:guyId
 * ============================================================
 */
router.get('/guy/:guyId', getRatingsForGuyController);

/**
 * ============================================================
 *   OBTENER RATINGS RECIBIDOS POR UN CLIENTE
 *   GET /ratings/client/:clientId
 * ============================================================
 */
router.get('/client/:clientId', getRatingsForClientController);

/**
 * ============================================================
 *   EXPORTAR RUTAS
 * ============================================================
 */
export default router;
