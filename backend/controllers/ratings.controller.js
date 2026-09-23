// backend/controllers/ratings.controller.js

/**
 * ============================================================
 *   CONTROLADOR: CALIFICACIONES (CLIENTE → GUY y GUY → CLIENTE)
 *   SECCIÓN 9 — Calificación del cliente hacia el Guy
 *   SECCIÓN 10 — Calificación del Guy hacia el cliente
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import {
  saveRatingService,
  getRatingsForGuyService,
  getRatingsForClientService
} from '../services/ratings.service.js';

import { validateRating } from '../validation/ratings.validation.js';

/**
 * ============================================================
 *   CREAR RATING (CLIENTE → GUY o GUY → CLIENTE)
 *   POST /ratings/create
 * ============================================================
 */
export const createRatingController = async (req, res) => {
  try {
    const payload = {
      raterId: req.body.raterId,       // quien califica
      raterType: req.body.raterType,   // 'client' o 'guy'
      rateeId: req.body.rateeId,       // quien recibe la calificación
      rateeType: req.body.rateeType,   // 'client' o 'guy'
      jobId: req.body.jobId,
      stars: req.body.stars,
      comment: req.body.comment || '',
      evidencePdf: req.body.evidencePdf || null,
      createdAt: req.body.createdAt || new Date().toISOString()
    };

    const validation = validateRating(payload);

    if (!validation.ok) {
      return res.status(400).json({
        ok: false,
        message: 'Datos inválidos para crear rating',
        errors: validation.errors
      });
    }

    const result = await saveRatingService(payload);

    if (!result.ok) {
      return res.status(500).json({
        ok: false,
        message: result.message || 'Error interno al guardar rating'
      });
    }

    return res.status(201).json({
      ok: true,
      message: 'Rating creado correctamente',
      data: result.data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al crear rating',
      error: error.message
    });
  }
};

/**
 * ============================================================
 *   OBTENER RATINGS RECIBIDOS POR UN GUY
 *   GET /ratings/guy/:guyId
 * ============================================================
 */
export const getRatingsForGuyController = async (req, res) => {
  try {
    const guyId = req.params.guyId;

    const result = await getRatingsForGuyService(guyId);

    if (!result.ok) {
      return res.status(404).json({
        ok: false,
        message: result.message || 'No se encontraron ratings para este Guy'
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Ratings del Guy obtenidos correctamente',
      data: result.data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener ratings del Guy',
      error: error.message
    });
  }
};

/**
 * ============================================================
 *   OBTENER RATINGS RECIBIDOS POR UN CLIENTE
 *   GET /ratings/client/:clientId
 * ============================================================
 */
export const getRatingsForClientController = async (req, res) => {
  try {
    const clientId = req.params.clientId;

    const result = await getRatingsForClientService(clientId);

    if (!result.ok) {
      return res.status(404).json({
        ok: false,
        message: result.message || 'No se encontraron ratings para este cliente'
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Ratings del cliente obtenidos correctamente',
      data: result.data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener ratings del cliente',
      error: error.message
    });
  }
};
