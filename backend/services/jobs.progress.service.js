// backend/services/jobs.progress.service.js

/**
 * ============================================
 *   SERVICIO: PROGRESO DEL TRABAJO (GUY)
 *   SECCIÓN 6 — Guy realiza el trabajo
 * ============================================
 */

import {
  createJobProgressStart,
  updateJobProgressEntry,
  findJobProgressByJob,
  findJobProgressByGuy
} from '../repository/jobs.progress.repository.js';
import { jobsProgressModel } from '../models/jobs.progress.model.js';

/**
 * ============================================
 *   SERVICIO: REGISTRAR INICIO DEL TRABAJO
 * ============================================
 */
export const startJobProgressService = async (payload) => {
  try {
    const startData = {
      jobId: payload.jobId,
      guyId: payload.guyId,
      clientId: payload.clientId,
      progress: 0,
      status: 'started',
      note: 'Trabajo iniciado',
      startedAt: payload.startedAt || new Date().toISOString(),
      updatedAt: payload.startedAt || new Date().toISOString()
    };

    const normalized = jobsProgressModel.normalize(startData);

    const created = await createJobProgressStart(normalized);

    if (!created) {
      return {
        ok: false,
        message: 'No se pudo registrar el inicio del trabajo'
      };
    }

    return {
      ok: true,
      data: created
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error interno en servicio de inicio de trabajo',
      error: error.message
    };
  }
};

/**
 * ============================================
 *   SERVICIO: REGISTRAR PROGRESO DEL TRABAJO
 * ============================================
 */
export const updateJobProgressService = async (payload) => {
  try {
    const updateData = {
      jobId: payload.jobId,
      guyId: payload.guyId,
      progress: payload.progress,
      status: payload.status,
      note: payload.note,
      updatedAt: payload.updatedAt || new Date().toISOString()
    };

    const normalized = jobsProgressModel.normalize(updateData);

    const updated = await updateJobProgressEntry(normalized);

    if (!updated) {
      return {
        ok: false,
        message: 'No se pudo actualizar el progreso del trabajo'
      };
    }

    return {
      ok: true,
      data: updated
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error interno en servicio de progreso del trabajo',
      error: error.message
    };
  }
};

/**
 * ============================================
 *   SERVICIO: OBTENER PROGRESO POR JOB
 * ============================================
 */
export const getJobProgressByJobService = async (jobId) => {
  try {
    const progressList = await findJobProgressByJob(jobId);

    if (!progressList || progressList.length === 0) {
      return {
        ok: false,
        message: 'No existe progreso registrado para este trabajo'
      };
    }

    return {
      ok: true,
      data: progressList
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al obtener progreso del trabajo',
      error: error.message
    };
  }
};

/**
 * ============================================
 *   SERVICIO: OBTENER PROGRESO POR GUY
 * ============================================
 */
export const getJobProgressByGuyService = async (guyId) => {
  try {
    const progressList = await findJobProgressByGuy(guyId);

    if (!progressList || progressList.length === 0) {
      return {
        ok: false,
        message: 'No existe progreso registrado para este Guy'
      };
    }

    return {
      ok: true,
      data: progressList
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al obtener progreso de trabajos del Guy',
      error: error.message
    };
  }
};
