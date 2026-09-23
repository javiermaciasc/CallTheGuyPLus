// backend/controllers/payments.controller.js

import {
  registerPaymentService,
  confirmPaymentService,
  getPaymentsByClientService,
  getPaymentsByGuyService
} from '../services/payments.service.js';

/**
 * ============================================
 *   REGISTRAR PAGO (CLIENTE → GUY)
 * ============================================
 */
export const registerPayment = async (req, res) => {
  try {
    const payload = req.body;
    const result = await registerPaymentService(payload);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al registrar pago',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   CONFIRMACIÓN DEL GUY
 * ============================================
 */
export const confirmPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const result = await confirmPaymentService(id, payload);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al confirmar pago',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   OBTENER PAGOS POR CLIENTE
 * ============================================
 */
export const getPaymentsByClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const result = await getPaymentsByClientService(clientId);

    if (!result.ok) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener pagos del cliente',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   OBTENER PAGOS POR GUY
 * ============================================
 */
export const getPaymentsByGuy = async (req, res) => {
  try {
    const { guyId } = req.params;
    const result = await getPaymentsByGuyService(guyId);

    if (!result.ok) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener pagos del Guy',
      error: err.message
    });
  }
};
