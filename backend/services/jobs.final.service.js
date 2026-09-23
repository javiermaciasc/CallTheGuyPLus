// backend/services/jobs.final.service.js

/**
 * ============================================
 *   SERVICIO: FOTOS FINALES DEL TRABAJO
 *   SECCIÓN 7 — Guy sube fotos finales
 * ============================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import {
  saveFinalPhotos,
  findFinalPhotosByJob,
  findFinalPhotosByGuy
} from '../repository/jobs.final.repository.js';

import { jobsFinalModel } from '../models/jobs.final.model.js';

/**
 * ============================================
 *   SERVICIO: GUARDAR FOTOS FINALES
 * ============================================
 */
export const uploadFinalPhotosService = async (payload) => {
  try {
    const normalized = jobsFinalModel.normalize({
      jobId: payload.jobId,
      guyId: payload.guyId,
      clientId: payload.clientId,
      photos: payload.photos,
      uploadedAt: payload.uploadedAt || new Date().toISOString()
    });

    const validation = jobsFinalModel.validate(normalized);

    if (!validation.ok) {
      return {
        ok: false,
        message: 'Validación fallida al guardar fotos finales',
        errors: validation.errors
      };
    }

    const saved = await saveFinalPhotos(normalized);

    if (!saved) {
      return {
        ok: false,
        message: 'No se pudieron guardar las fotos finales'
      };
    }

    return {
      ok: true,
      data: saved
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error interno en servicio de fotos finales',
      error: error.message
    };
  }
};

/**
 * ============================================
 *   SERVICIO: OBTENER FOTOS FINALES POR JOB
 * ============================================
 */
export const getFinalPhotosByJobService = async (jobId) => {
  try {
    const photos = await findFinalPhotosByJob(jobId);

    if (!photos || photos.length === 0) {
      return {
        ok: false,
        message: 'No existen fotos finales para este trabajo'
      };
    }

    return {
      ok: true,
      data: photos
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al obtener fotos finales por trabajo',
      error: error.message
    };
  }
};

/**
 * ============================================
 *   SERVICIO: OBTENER FOTOS FINALES POR GUY
 * ============================================
 */
export const getFinalPhotosByGuyService = async (guyId) => {
  try {
    const photos = await findFinalPhotosByGuy(guyId);

    if (!photos || photos.length === 0) {
      return {
        ok: false,
        message: 'No existen fotos finales para este Guy'
      };
    }

    return {
      ok: true,
      data: photos
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al obtener fotos finales por Guy',
      error: error.message
    };
  }
};
