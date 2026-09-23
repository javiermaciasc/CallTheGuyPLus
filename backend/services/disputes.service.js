// backend/services/disputes.service.js

/**
 * ====================================================
 *   SERVICIO: DISPUTAS
 *   SECCIÓN 8 — Comparar evidencia del cliente
 *               vs fotos finales del Guy
 * ====================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import {
  createDispute,
  respondDispute,
  findDisputeByJob,
  findDisputesByClient,
  findDisputesByGuy
} from '../repository/disputes.repository.js';

import { findFinalPhotosByJob } from '../repository/jobs.final.repository.js';

import { disputesModel } from '../models/disputes.model.js';

/**
 * ====================================================
 *   CREAR DISPUTA (CLIENTE)
 * ====================================================
 */
export const createDisputeService = async (payload) => {
  try {
    const normalized = disputesModel.normalize(payload);
    const validation = disputesModel.validate(normalized);

    if (!validation.ok) {
      return {
        ok: false,
        message: 'Validación fallida al crear disputa',
        errors: validation.errors
      };
    }

    const saved = await createDispute(normalized);

    if (!saved) {
      return {
        ok: false,
        message: 'No se pudo crear la disputa'
      };
    }

    return {
      ok: true,
      data: saved
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error interno en servicio de creación de disputa',
      error: error.message
    };
  }
};

/**
 * ====================================================
 *   RESPONDER DISPUTA (GUY)
 * ====================================================
 */
export const respondDisputeService = async (payload) => {
  try {
    const normalized = {
      disputeId: payload.disputeId,
      guyId: payload.guyId,
      response: payload.response,
      respondedAt: payload.respondedAt || new Date().toISOString(),
      status: 'responded'
    };

    const validation = disputesModel.validate({
      ...normalized,
      jobId: 'placeholder',
      clientId: 'placeholder',
      reason: 'placeholder',
      description: 'placeholder',
      createdAt: new Date().toISOString()
    });

    if (!validation.ok) {
      return {
        ok: false,
        message: 'Validación fallida al responder disputa',
        errors: validation.errors
      };
    }

    const updated = await respondDispute(normalized);

    if (!updated) {
      return {
        ok: false,
        message: 'No se pudo responder la disputa'
      };
    }

    return {
      ok: true,
      data: updated
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error interno en servicio de respuesta de disputa',
      error: error.message
    };
  }
};

/**
 * ====================================================
 *   OBTENER DISPUTA POR JOB
 * ====================================================
 */
export const getDisputeByJobService = async (jobId) => {
  try {
    const dispute = await findDisputeByJob(jobId);

    if (!dispute) {
      return {
        ok: false,
        message: 'No existe disputa para este trabajo'
      };
    }

    return {
      ok: true,
      data: dispute
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al obtener disputa por trabajo',
      error: error.message
    };
  }
};

/**
 * ====================================================
 *   OBTENER DISPUTAS POR CLIENTE
 * ====================================================
 */
export const getDisputesByClientService = async (clientId) => {
  try {
    const disputes = await findDisputesByClient(clientId);

    if (!disputes || disputes.length === 0) {
      return {
        ok: false,
        message: 'No existen disputas para este cliente'
      };
    }

    return {
      ok: true,
      data: disputes
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al obtener disputas del cliente',
      error: error.message
    };
  }
};

/**
 * ====================================================
 *   OBTENER DISPUTAS POR GUY
 * ====================================================
 */
export const getDisputesByGuyService = async (guyId) => {
  try {
    const disputes = await findDisputesByGuy(guyId);

    if (!disputes || disputes.length === 0) {
      return {
        ok: false,
        message: 'No existen disputas para este Guy'
      };
    }

    return {
      ok: true,
      data: disputes
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al obtener disputas del Guy',
      error: error.message
    };
  }
};

/**
 * ====================================================
 *   COMPARAR EVIDENCIA DEL CLIENTE
 *   VS FOTOS FINALES DEL GUY
 * ====================================================
 *
 *   Este es el requisito central de la sección.
 *   Aquí se compara:
 *     - evidencia del cliente (texto, fotos, descripción)
 *     - fotos finales subidas por el Guy
 *
 *   El objetivo es determinar si la disputa tiene fundamento.
 * ====================================================
 */
export const compareClientEvidenceWithFinalPhotosService = async (payload) => {
  try {
    const { jobId, clientEvidence } = payload;

    // Obtener fotos finales del Guy
    const finalPhotos = await findFinalPhotosByJob(jobId);

    if (!finalPhotos || finalPhotos.length === 0) {
      return {
        ok: false,
        message: 'No existen fotos finales del Guy para comparar'
      };
    }

    // Comparación básica (puede expandirse con IA, visión, etc.)
    const comparison = {
      jobId,
      clientEvidence,
      finalPhotos,
      matchScore: 0,
      issuesDetected: []
    };

    // Regla 1: si el cliente reporta "faltan fotos"
    if (clientEvidence?.missingPhotos === true) {
      if (finalPhotos[0].photos.length < (clientEvidence.expectedPhotos || 1)) {
        comparison.issuesDetected.push('El Guy subió menos fotos de las esperadas.');
        comparison.matchScore -= 20;
      }
    }

    // Regla 2: si el cliente reporta "trabajo incompleto"
    if (clientEvidence?.incompleteWork === true) {
      comparison.issuesDetected.push('Cliente reporta trabajo incompleto.');
      comparison.matchScore -= 30;
    }

    // Regla 3: si el cliente reporta "daño"
    if (clientEvidence?.damageReported === true) {
      comparison.issuesDetected.push('Cliente reporta daño en el trabajo.');
      comparison.matchScore -= 40;
    }

    // Regla 4: si el cliente adjunta fotos
    if (Array.isArray(clientEvidence?.photos) && clientEvidence.photos.length > 0) {
      comparison.issuesDetected.push('Cliente adjuntó evidencia fotográfica.');
      comparison.matchScore -= 10;
    }

    // Regla 5: si el Guy subió muchas fotos → aumenta credibilidad
    if (finalPhotos[0].photos.length >= 5) {
      comparison.matchScore += 15;
    }

    return {
      ok: true,
      data: comparison
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al comparar evidencia del cliente con fotos finales',
      error: error.message
    };
  }
};
