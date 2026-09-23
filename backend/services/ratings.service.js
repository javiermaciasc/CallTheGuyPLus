// backend/services/ratings.service.js

/**
 * ============================================================
 *   SERVICIO: RATINGS
 *   SECCIÓN 9 — Calificación del cliente hacia el Guy
 *   SECCIÓN 10 — Calificación del Guy hacia el cliente
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import {
  saveRating,
  findRatingsForGuy,
  findRatingsForClient,
  findRatingsByJob,
  findRatingsMadeByClient,
  findRatingsMadeByGuy
} from '../repository/ratings.repository.js';

import { ratingsModel } from '../models/ratings.model.js';

/**
 * ============================================================
 *   GUARDAR RATING (CLIENTE → GUY o GUY → CLIENTE)
 * ============================================================
 */
export const saveRatingService = async (payload) => {
  try {
    // Normalizar
    const normalized = ratingsModel.normalize(payload);

    // Validar
    const validation = ratingsModel.validate(normalized);

    if (!validation.ok) {
      return {
        ok: false,
        message: 'Validación fallida al guardar rating',
        errors: validation.errors
      };
    }

    // Guardar en BD
    const saved = await saveRating(normalized);

    if (!saved) {
      return {
        ok: false,
        message: 'No se pudo guardar el rating'
      };
    }

    return {
      ok: true,
      data: saved
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error interno en servicio de guardar rating',
      error: error.message
    };
  }
};

/**
 * ============================================================
 *   OBTENER RATINGS RECIBIDOS POR UN GUY
 *   (CLIENTE → GUY)
 * ============================================================
 */
export const getRatingsForGuyService = async (guyId) => {
  try {
    const ratings = await findRatingsForGuy(guyId);

    if (!ratings || ratings.length === 0) {
      return {
        ok: false,
        message: 'No existen ratings para este Guy'
      };
    }

    return {
      ok: true,
      data: ratings
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al obtener ratings del Guy',
      error: error.message
    };
  }
};

/**
 * ============================================================
 *   OBTENER RATINGS RECIBIDOS POR UN CLIENTE
 *   (GUY → CLIENTE)
 * ============================================================
 */
export const getRatingsForClientService = async (clientId) => {
  try {
    const ratings = await findRatingsForClient(clientId);

    if (!ratings || ratings.length === 0) {
      return {
        ok: false,
        message: 'No existen ratings para este cliente'
      };
    }

    return {
      ok: true,
      data: ratings
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al obtener ratings del cliente',
      error: error.message
    };
  }
};

/**
 * ============================================================
 *   OBTENER TODOS LOS RATINGS DE UN TRABAJO
 *   (Ambos sentidos)
 * ============================================================
 */
export const getRatingsByJobService = async (jobId) => {
  try {
    const ratings = await findRatingsByJob(jobId);

    if (!ratings || ratings.length === 0) {
      return {
        ok: false,
        message: 'No existen ratings para este trabajo'
      };
    }

    return {
      ok: true,
      data: ratings
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al obtener ratings del trabajo',
      error: error.message
    };
  }
};

/**
 * ============================================================
 *   OBTENER RATINGS HECHOS POR UN CLIENTE
 *   (CLIENTE → GUY)
 * ============================================================
 */
export const getRatingsMadeByClientService = async (clientId) => {
  try {
    const ratings = await findRatingsMadeByClient(clientId);

    if (!ratings || ratings.length === 0) {
      return {
        ok: false,
        message: 'El cliente no ha realizado ratings'
      };
    }

    return {
      ok: true,
      data: ratings
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al obtener ratings hechos por el cliente',
      error: error.message
    };
  }
};

/**
 * ============================================================
 *   OBTENER RATINGS HECHOS POR UN GUY
 *   (GUY → CLIENTE)
 * ============================================================
 */
export const getRatingsMadeByGuyService = async (guyId) => {
  try {
    const ratings = await findRatingsMadeByGuy(guyId);

    if (!ratings || ratings.length === 0) {
      return {
        ok: false,
        message: 'El Guy no ha realizado ratings'
      };
    }

    return {
      ok: true,
      data: ratings
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al obtener ratings hechos por el Guy',
      error: error.message
    };
  }
};
