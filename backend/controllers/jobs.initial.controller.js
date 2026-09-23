// backend/controllers/jobs.initial.controller.js

import {
  uploadInitialPhotosService,
  saveInitialNotesService,
  getInitialPhotosService,
  getInitialNotesService
} from '../services/jobs.initial.service.js';

/**
 * ============================================
 *   SUBIR FOTOS INICIALES DEL CLIENTE
 * ============================================
 */
export const uploadInitialPhotos = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const files = req.files;

    const result = await uploadInitialPhotosService(jobId, files);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al subir fotos iniciales',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   GUARDAR NOTAS INICIALES DEL CLIENTE
 * ============================================
 */
export const saveInitialNotes = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const { notes } = req.body;

    const result = await saveInitialNotesService(jobId, notes);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al guardar notas iniciales',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   MOSTRAR FOTOS INICIALES DEL CLIENTE
 * ============================================
 */
export const getInitialPhotos = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const result = await getInitialPhotosService(jobId);

    if (!result.ok) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener fotos iniciales',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   MOSTRAR NOTAS INICIALES DEL CLIENTE
 * ============================================
 */
export const getInitialNotes = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const result = await getInitialNotesService(jobId);

    if (!result.ok) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener notas iniciales',
      error: err.message
    });
  }
};
