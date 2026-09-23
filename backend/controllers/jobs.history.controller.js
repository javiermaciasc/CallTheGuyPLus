// backend/controllers/jobs.history.controller.js

/**
 * ============================================================
 *   CONTROLADOR: HISTORIAL DE TRABAJO PERMANENTE
 *   SECCIÓN 12 — Trabajo permanente (NO se borra jamás)
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import {
  getHistoryByClientService,
  getHistoryByGuyService,
  getHistoryByJobService
} from '../services/jobs.history.service.js';

/**
 * ============================================================
 *   OBTENER HISTORIAL POR CLIENTE
 *   GET /history/client/:clientId
 * ============================================================
 */
export const getHistoryByClientController = async (req, res) => {
  try {
    const { clientId } = req.params;

    const result = await getHistoryByClientService(clientId);

    if (!result.ok) {
      return res.status(404).json({
        ok: false,
        message: result.message,
        errors: result.errors || null
      });
    }

    return res.json({
      ok: true,
      data: result.data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener historial del cliente',
      error: error.message
    });
  }
};

/**
 * ============================================================
 *   OBTENER HISTORIAL POR GUY
 *   GET /history/guy/:guyId
 * ============================================================
 */
export const getHistoryByGuyController = async (req, res) => {
  try {
    const { guyId } = req.params;

    const result = await getHistoryByGuyService(guyId);

    if (!result.ok) {
      return res.status(404).json({
        ok: false,
        message: result.message,
        errors: result.errors || null
      });
    }

    return res.json({
      ok: true,
      data: result.data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener historial del Guy',
      error: error.message
    });
  }
};

/**
 * ============================================================
 *   OBTENER HISTORIAL POR JOB
 *   GET /history/job/:jobId
 * ============================================================
 */
export const getHistoryByJobController = async (req, res) => {
  try {
    const { jobId } = req.params;

    const result = await getHistoryByJobService(jobId);

    if (!result.ok) {
      return res.status(404).json({
        ok: false,
        message: result.message,
        errors: result.errors || null
      });
    }

    return res.json({
      ok: true,
      data: result.data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener historial del Job',
      error: error.message
    });
  }
};
