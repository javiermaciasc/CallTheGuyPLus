// backend/services/payments.service.js

import { v4 as uuidv4 } from 'uuid';
import { Payment } from '../models/materials.payment.model.js';

/**
 * Base temporal en memoria (simulación de BD)
 */
const paymentsDB = [];

/**
 * ============================================
 *   PAGO DE MANO DE OBRA
 * ============================================
 */
export const laborPaymentService = async (payload) => {
  try {
    const payment = new Payment({
      id: uuidv4(),
      clientId: payload.clientId,
      guyId: payload.guyId,
      amount: payload.amount,
      method: payload.method,
      status: 'labor-payment',
      createdAt: new Date().toISOString(),
      updatedAt: null
    });

    paymentsDB.push(payment);

    return {
      ok: true,
      message: 'Pago de mano de obra registrado correctamente',
      data: payment
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error al registrar pago de mano de obra',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   PAGO TOTAL
 * ============================================
 */
export const totalPaymentService = async (payload) => {
  try {
    const payment = new Payment({
      id: uuidv4(),
      clientId: payload.clientId,
      guyId: payload.guyId,
      amount: payload.amount,
      method: payload.method,
      status: 'total-payment',
      createdAt: new Date().toISOString(),
      updatedAt: null
    });

    paymentsDB.push(payment);

    return {
      ok: true,
      message: 'Pago total registrado correctamente',
      data: payment
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error al registrar pago total',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   PAGO PARCIAL
 * ============================================
 */
export const partialPaymentService = async (payload) => {
  try {
    const payment = new Payment({
      id: uuidv4(),
      clientId: payload.clientId,
      guyId: payload.guyId,
      amount: payload.amount,
      method: payload.method,
      status: 'partial-payment',
      createdAt: new Date().toISOString(),
      updatedAt: null
    });

    paymentsDB.push(payment);

    return {
      ok: true,
      message: 'Pago parcial registrado correctamente',
      data: payment
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error al registrar pago parcial',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   VALIDAR PAGO (⭐ SECCIÓN 5)
 * ============================================
 */
export const validatePaymentService = async (paymentId) => {
  try {
    if (!paymentId) {
      return {
        ok: false,
        message: 'El paymentId es obligatorio'
      };
    }

    const payment = paymentsDB.find((p) => p.id === paymentId);

    if (!payment) {
      return {
        ok: false,
        message: 'Pago no encontrado'
      };
    }

    payment.validated = true;
    payment.validatedAt = new Date().toISOString();

    return {
      ok: true,
      message: 'Pago validado correctamente',
      data: payment
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error al validar pago',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   OBTENER TODOS LOS PAGOS
 * ============================================
 */
export const getAllPaymentsService = async () => {
  try {
    return {
      ok: true,
      data: paymentsDB
    };
  } catch (err) {
    return {
      ok: false,
      message: 'Error al obtener pagos',
      error: err.message
    };
  }
};
