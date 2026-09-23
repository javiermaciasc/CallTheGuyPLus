// backend/services/jobs.history.service.js

/**
 * ============================================================
 *   SERVICIO: HISTORIAL DE TRABAJO PERMANENTE
 *   SECCIÓN 12 — Trabajo permanente (NO se borra jamás)
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import {
  saveHistoryEntry,
  findHistoryByClient,
  findHistoryByGuy,
  findHistoryByJob,
  findAllHistory
} from '../repository/jobs.history.repository.js';

import { jobsHistoryModel } from '../models/jobs.history.model.js';

/**
 * ============================================================
 *   GUARDAR ENTRADA DE HISTORIAL
 * ============================================================
 */
export const saveHistoryService = async (payload) => {
  try {
    // Normalizar
    const normalized = jobsHistoryModel.normalize(payload);

    // Validar
    const validation = jobsHistoryModel.validate(normalized);

    if (!validation.ok) {
      return {
        ok: false,
        message: 'Validación fallida al guardar historial',
        errors: validation.errors
      };
    }

    // Guardar en BD
    const saved = await saveHistoryEntry(normalized);

    if (!saved) {
      return {
        ok: false,
        message: 'No se pudo guardar la entrada de historial'
      };
    }

    return {
      ok: true,
      data: normalized
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al guardar historial',
      error: error.message
    };
  }
};

/**
 * ============================================================
 *   OBTENER HISTORIAL POR CLIENTE
 * ============================================================
 */
export const getHistoryByClientService = async (clientId) => {
  try {
    const history = await findHistoryByClient(clientId);

    if (!history || history.length === 0) {
      return {
        ok: false,
        message: 'No existe historial para este cliente'
      };
    }

    return {
      ok: true,
      data: history
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al obtener historial del cliente',
      error: error.message
    };
  }
};

/**
 * ============================================================
 *   OBTENER HISTORIAL POR GUY
 * ============================================================
 */
export const getHistoryByGuyService = async (guyId) => {
  try {
    const history = await findHistoryByGuy(guyId);

    if (!history || history.length === 0) {
      return {
        ok: false,
        message: 'No existe historial para este Guy'
      };
    }

    return {
      ok: true,
      data: history
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al obtener historial del Guy',
      error: error.message
    };
  }
};

/**
 * ============================================================
 *   OBTENER HISTORIAL POR JOB
 * ============================================================
 */
export const getHistoryByJobService = async (jobId) => {
  try {
    const history = await findHistoryByJob(jobId);

    if (!history || history.length === 0) {
      return {
        ok: false,
        message: 'No existe historial para este Job'
      };
    }

    return {
      ok: true,
      data: history
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al obtener historial del Job',
      error: error.message
    };
  }
};

/**
 * ============================================================
 *   OBTENER TODO EL HISTORIAL
 * ============================================================
 */
export const getAllHistoryService = async () => {
  try {
    const history = await findAllHistory();

    if (!history || history.length === 0) {
      return {
        ok: false,
        message: 'No existen entradas de historial'
      };
    }

    return {
      ok: true,
      data: history
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al obtener todo el historial',
      error: error.message
    };
  }
};
