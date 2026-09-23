// backend/controllers/jobs.progress.controller.js

/**
 * ============================================
 *   CONTROLADOR: PROGRESO DEL TRABAJO (GUY)
 *   SECCIÓN 6 — Guy realiza el trabajo
 * ============================================
 */

import {
  startJobProgressService,
  updateJobProgressService,
  getJobProgressByJobService,
  getJobProgressByGuyService
} from '../services/jobs.progress.service.js';
import { validateJobProgressStart, validateJobProgressUpdate } from '../validation/jobs.progress.validation.js';

/**
 * ============================================
 *   REGISTRAR INICIO DEL TRABAJO
 *   (CLIENTE → GUY inicia trabajo)
 * ============================================
 */
export const startJobProgressController = async (req, res) => {
  try {
    const payload = {
      jobId: req.body.jobId,
      guyId: req.body.guyId,
      clientId: req.body.clientId,
      startedAt: req.body.startedAt
    };

    const validation = validateJobProgressStart(payload);

    if (!validation.ok) {
      return res.status(400).json({
        ok: false,
        message: 'Datos inválidos para iniciar el trabajo',
        errors: validation.errors
      });
    }

    const result = await startJobProgressService(payload);

    if (!result.ok) {
      return res.status(500).json({
        ok: false,
        message: result.message || 'Error interno al registrar inicio del trabajo'
      });
    }

    return res.status(201).json({
      ok: true,
      message: 'Inicio del trabajo registrado correctamente',
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al registrar inicio del trabajo',
      error: error.message
    });
  }
};

/**
 * ============================================
 *   REGISTRAR PROGRESO DEL TRABAJO
 *   (GUY actualiza avance)
 * ============================================
 */
export const updateJobProgressController = async (req, res) => {
  try {
    const payload = {
      jobId: req.body.jobId,
      guyId: req.body.guyId,
      progress: req.body.progress,
      status: req.body.status,
      note: req.body.note,
      updatedAt: req.body.updatedAt
    };

    const validation = validateJobProgressUpdate(payload);

    if (!validation.ok) {
      return res.status(400).json({
        ok: false,
        message: 'Datos inválidos para actualizar el progreso del trabajo',
        errors: validation.errors
      });
    }

    const result = await updateJobProgressService(payload);

    if (!result.ok) {
      return res.status(500).json({
        ok: false,
        message: result.message || 'Error interno al registrar progreso del trabajo'
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Progreso del trabajo actualizado correctamente',
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al actualizar el progreso del trabajo',
      error: error.message
    });
  }
};

/**
 * ============================================
 *   OBTENER PROGRESO POR JOB
 *   (CLIENTE / GUY / ADMIN)
 * ============================================
 */
export const getJobProgressByJobController = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const result = await getJobProgressByJobService(jobId);

    if (!result.ok) {
      return res.status(404).json({
        ok: false,
        message: result.message || 'No se encontró progreso para este trabajo'
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Progreso del trabajo obtenido correctamente',
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener progreso del trabajo',
      error: error.message
    });
  }
};

/**
 * ============================================
 *   OBTENER PROGRESO POR GUY
 *   (ADMIN / GUY)
 * ============================================
 */
export const getJobProgressByGuyController = async (req, res) => {
  try {
    const guyId = req.params.guyId;

    const result = await getJobProgressByGuyService(guyId);

    if (!result.ok) {
      return res.status(404).json({
        ok: false,
        message: result.message || 'No se encontró progreso para este Guy'
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Progreso de trabajos del Guy obtenido correctamente',
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener progreso de trabajos del Guy',
      error: error.message
    });
  }
};
