// backend/services/jobs.initial.service.js

import { jobsInitialPhotosRepository, jobsInitialNotesRepository } from '../repository/jobs.initial.repository.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * ============================================
 *   GUARDAR FOTOS INICIALES DEL CLIENTE
 * ============================================
 */
export const uploadInitialPhotosService = async (jobId, files) => {
  try {
    if (!jobId) {
      return { ok: false, message: 'El jobId es obligatorio' };
    }

    if (!files || files.length === 0) {
      return { ok: false, message: 'Debe subir al menos una foto' };
    }

    const savedPhotos = [];

    for (const file of files) {
      const fileData = {
        url: file.path || file.location || null,
        filename: file.originalname || file.filename || `photo-${uuidv4()}`
      };

      const photo = jobsInitialPhotosRepository.create(jobId, fileData);
      savedPhotos.push(photo);
    }

    return {
      ok: true,
      message: 'Fotos iniciales guardadas correctamente',
      data: savedPhotos
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno al guardar fotos iniciales',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   GUARDAR NOTAS INICIALES DEL CLIENTE
 * ============================================
 */
export const saveInitialNotesService = async (jobId, notes) => {
  try {
    if (!jobId) {
      return { ok: false, message: 'El jobId es obligatorio' };
    }

    if (!notes || notes.trim().length === 0) {
      return { ok: false, message: 'Las notas no pueden estar vacías' };
    }

    const existing = jobsInitialNotesRepository.findByJobId(jobId);

    let result;

    if (!existing) {
      result = jobsInitialNotesRepository.create(jobId, notes);
    } else {
      result = jobsInitialNotesRepository.update(jobId, notes);
    }

    return {
      ok: true,
      message: 'Notas iniciales guardadas correctamente',
      data: result
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno al guardar notas iniciales',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   OBTENER FOTOS INICIALES DEL CLIENTE
 * ============================================
 */
export const getInitialPhotosService = async (jobId) => {
  try {
    const photos = jobsInitialPhotosRepository.findByJobId(jobId);

    if (!photos || photos.length === 0) {
      return { ok: false, message: 'No hay fotos iniciales registradas' };
    }

    return {
      ok: true,
      data: photos
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno al obtener fotos iniciales',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   OBTENER NOTAS INICIALES DEL CLIENTE
 * ============================================
 */
export const getInitialNotesService = async (jobId) => {
  try {
    const notes = jobsInitialNotesRepository.findByJobId(jobId);

    if (!notes) {
      return { ok: false, message: 'No hay notas iniciales registradas' };
    }

    return {
      ok: true,
      data: notes
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno al obtener notas iniciales',
      error: err.message
    };
  }
};
