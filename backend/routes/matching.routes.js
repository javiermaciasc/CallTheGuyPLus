// backend/routes/matching.routes.js

import { Router } from 'express';

import {
  matchByLanguageController,
  matchByDistanceController,
  matchBySpecialtyController,
  fullMatchingController
} from '../controllers/matching.controller.js';

const router = Router();

/**
 * ============================================
 *   RUTA: MATCHING POR IDIOMA
 *   GET /matching/language/:clientId
 * ============================================
 */
router.get('/language/:clientId', matchByLanguageController);

/**
 * ============================================
 *   RUTA: MATCHING POR CERCANÍA
 *   GET /matching/distance/:clientId
 * ============================================
 */
router.get('/distance/:clientId', matchByDistanceController);

/**
 * ============================================
 *   RUTA: MATCHING POR ESPECIALIDAD
 *   GET /matching/specialty/:clientId
 * ============================================
 */
router.get('/specialty/:clientId', matchBySpecialtyController);

/**
 * ============================================
 *   RUTA: MATCHING COMPLETO
 *   (IDIOMA + DISTANCIA + ESPECIALIDAD)
 *   GET /matching/full/:clientId
 * ============================================
 */
router.get('/full/:clientId', fullMatchingController);

export default router;
