// backend/controllers/disputes.controller.js

/**
 * ============================================
 *   CONTROLADOR: MANEJO DE DISPUTAS
 *   SECCIÓN 8 — Cliente abre disputa / Guy responde
 * ============================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import {
  createDisputeService,
  respondDisputeService,
  getDisputeByJobService,
  getDisputesByClientService,
  getDisputesByGuyService
} from '../services/disputes.service.js';

import {
  validateCreateDispute,
  validateRespondDispute
} from '../validation/disputes.validation.js';

/**
 * ============================================
 *   CREAR DISPUTA (CLIENTE)
 *   POST /disputes/create
 * ============================================
 */
export const createDisputeController = async (req, res) => {
  try {
    const payload = {
      jobId: req.body.jobId,
      clientId: req.body.clientId,
      guyId: req.body.guyId,
      reason: req.body.reason,
      description: req.body.description,
      createdAt: req.body.createdAt || new Date().toISOString(),
      status: 'open'
    };

    const validation = validateCreateDispute(payload);

    if (!validation.ok) {
      return res.status(400).json({
        ok: false,
        message: 'Datos inválidos para crear disputa',
        errors: validation.errors
      });
    }

    const result = await createDisputeService(payload);

    if (!result.ok) {
      return res.status(500).json({
        ok: false,
        message: result.message || 'Error interno al crear disputa'
      });
    }

    return res.status(201).json({
      ok: true,
      message: 'Disputa creada correctamente',
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al crear disputa',
      error: error.message
    });
  }
};

/**
 * ============================================
 *   RESPONDER DISPUTA (GUY)
 *   PUT /disputes/respond
 * ============================================
 */
export const respondDisputeController = async (req, res) => {
  try {
    const payload = {
      disputeId: req.body.disputeId,
      guyId: req.body.guyId,
      response: req.body.response,
      respondedAt: req.body.respondedAt || new Date().toISOString(),
      status: 'responded'
    };

    const validation = validateRespondDispute(payload);

    if (!validation.ok) {
      return res.status(400).json({
        ok: false,
        message: 'Datos inválidos para responder disputa',
        errors: validation.errors
      });
    }

    const result = await respondDisputeService(payload);

    if (!result.ok) {
      return res.status(500).json({
        ok: false,
        message: result.message || 'Error interno al responder disputa'
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Respuesta enviada correctamente',
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al responder disputa',
      error: error.message
    });
  }
};

/**
 * ============================================
 *   OBTENER DISPUTA POR JOB
 *   GET /disputes/job/:jobId
 * ============================================
 */
export const getDisputeByJobController = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const result = await getDisputeByJobService(jobId);

    if (!result.ok) {
      return res.status(404).json({
        ok: false,
        message: result.message || 'No se encontró disputa para este trabajo'
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Disputa obtenida correctamente',
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener disputa por trabajo',
      error: error.message
    });
  }
};

/**
 * ============================================
 *   OBTENER DISPUTAS POR CLIENTE
 *   GET /disputes/client/:clientId
 * ============================================
 */
export const getDisputesByClientController = async (req, res) => {
  try {
    const clientId = req.params.clientId;

    const result = await getDisputesByClientService(clientId);

    if (!result.ok) {
      return res.status(404).json({
        ok: false,
        message: result.message || 'No se encontraron disputas para este cliente'
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Disputas del cliente obtenidas correctamente',
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener disputas del cliente',
      error: error.message
    });
  }
};

/**
 * ============================================
 *   OBTENER DISPUTAS POR GUY
 *   GET /disputes/guy/:guyId
 * ============================================
 */
export const getDisputesByGuyController = async (req, res) => {
  try {
    const guyId = req.params.guyId;

    const result = await getDisputesByGuyService(guyId);

    if (!result.ok) {
      return res.status(404).json({
        ok: false,
        message: result.message || 'No se encontraron disputas para este Guy'
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Disputas del Guy obtenidas correctamente',
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener disputas del Guy',
      error: error.message
    });
  }
};
