// backend/controllers/materials.payments.controller.js

import {
  insertMaterialPaymentService,
  getMaterialPaymentService,
  updateMaterialPaymentService,
  deleteMaterialPaymentService
} from '../services/materials.payments.service.js';

/**
 * ============================================
 *   REGISTRAR PAGO DE MATERIALES
 * ============================================
 */
export const registerMaterialPayment = async (req, res) => {
  try {
    const payload = req.body;
    const result = await insertMaterialPaymentService(payload);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al registrar pago de materiales',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   OBTENER PAGO DE MATERIALES POR ID
 * ============================================
 */
export const getMaterialPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getMaterialPaymentService(id);

    if (!result.ok) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener pago de materiales',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   ACTUALIZAR PAGO DE MATERIALES
 * ============================================
 */
export const updateMaterialPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const result = await updateMaterialPaymentService(id, payload);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al actualizar pago de materiales',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   ELIMINAR PAGO DE MATERIALES
 * ============================================
 */
export const deleteMaterialPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteMaterialPaymentService(id);

    if (!result.ok) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al eliminar pago de materiales',
      error: err.message
    });
  }
};
