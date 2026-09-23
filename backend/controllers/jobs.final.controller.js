// backend/controllers/jobs.final.controller.js

/**
 * ============================================
 *   CONTROLADOR: FOTOS FINALES DEL TRABAJO
 *   SECCIÓN 7 — Guy sube fotos finales (OBLIGATORIAS)
 * ============================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import {
  uploadFinalPhotosService,
  getFinalPhotosByJobService,
  getFinalPhotosByGuyService
} from '../services/jobs.final.service.js';

import { validateFinalPhotosUpload } from '../validation/jobs.final.validation.js';

/**
 * ============================================
 *   SUBIR FOTOS FINALES DEL TRABAJO
 *   (GUY → Cliente)
 * ============================================
 */
export const uploadFinalPhotosController = async (req, res) => {
  try {
    const payload = {
      jobId: req.body.jobId,
      guyId: req.body.guyId,
      clientId: req.body.clientId,
      photos: req.body.photos, // array de URLs o base64
      uploadedAt: req.body.uploadedAt || new Date().toISOString()
    };

    const validation = validateFinalPhotosUpload(payload);

    if (!validation.ok) {
      return res.status(400).json({
        ok: false,
        message: 'Datos inválidos para subir fotos finales',
        errors: validation.errors
      });
    }

    const result = await uploadFinalPhotosService(payload);

    if (!result.ok) {
      return res.status(500).json({
        ok: false,
        message: result.message || 'Error interno al subir fotos finales'
      });
    }

    return res.status(201).json({
      ok: true,
      message: 'Fotos finales subidas correctamente',
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al subir fotos finales',
      error: error.message
    });
  }
};

/**
 * ============================================
 *   OBTENER FOTOS FINALES POR JOB
 *   (CLIENTE / GUY / ADMIN)
 * ============================================
 */
export const getFinalPhotosByJobController = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const result = await getFinalPhotosByJobService(jobId);

    if (!result.ok) {
      return res.status(404).json({
        ok: false,
        message: result.message || 'No se encontraron fotos finales para este trabajo'
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Fotos finales obtenidas correctamente',
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener fotos finales del trabajo',
      error: error.message
    });
  }
};

/**
 * ============================================
 *   OBTENER FOTOS FINALES POR GUY
 *   (ADMIN / GUY)
 * ============================================
 */
export const getFinalPhotosByGuyController = async (req, res) => {
  try {
    const guyId = req.params.guyId;

    const result = await getFinalPhotosByGuyService(guyId);

    if (!result.ok) {
      return res.status(404).json({
        ok: false,
        message: result.message || 'No se encontraron fotos finales para este Guy'
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Fotos finales del Guy obtenidas correctamente',
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener fotos finales del Guy',
      error: error.message
    });
  }
};
