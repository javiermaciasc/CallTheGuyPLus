// backend/controllers/matching.controller.js

import { matchByLanguageService } from '../services/matching.language.service.js';
import { matchByDistanceService } from '../services/matching.distance.service.js';
import { matchBySpecialtyService } from '../services/matching.specialty.service.js';

/**
 * ============================================
 *   MATCHING POR IDIOMA
 *   GET /matching/language/:clientId
 * ============================================
 */
export const matchByLanguageController = async (req, res) => {
  const { clientId } = req.params;

  try {
    const result = await matchByLanguageService(clientId);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.json(result);

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno en matching por idioma',
      error: error.message
    });
  }
};

/**
 * ============================================
 *   MATCHING POR CERCANÍA
 *   GET /matching/distance/:clientId
 * ============================================
 */
export const matchByDistanceController = async (req, res) => {
  const { clientId } = req.params;

  try {
    const result = await matchByDistanceService(clientId);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.json(result);

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno en matching por distancia',
      error: error.message
    });
  }
};

/**
 * ============================================
 *   MATCHING POR ESPECIALIDAD
 *   GET /matching/specialty/:clientId
 * ============================================
 */
export const matchBySpecialtyController = async (req, res) => {
  const { clientId } = req.params;

  try {
    const result = await matchBySpecialtyService(clientId);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.json(result);

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno en matching por especialidad',
      error: error.message
    });
  }
};

/**
 * ============================================
 *   MATCHING COMPLETO (IDIOMA + DISTANCIA + ESPECIALIDAD)
 *   GET /matching/full/:clientId
 * ============================================
 */
export const fullMatchingController = async (req, res) => {
  const { clientId } = req.params;

  try {
    const language = await matchByLanguageService(clientId);
    const distance = await matchByDistanceService(clientId);
    const specialty = await matchBySpecialtyService(clientId);

    return res.json({
      ok: true,
      message: 'Matching completo generado correctamente',
      data: {
        language: language.data || [],
        distance: distance.data || [],
        specialty: specialty.data || []
      }
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno generando matching completo',
      error: error.message
    });
  }
};
