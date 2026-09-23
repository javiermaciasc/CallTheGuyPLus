// backend/services/guyplus.payments.service.js

import { v4 as uuidv4 } from 'uuid';
import { VendorPayment } from '../models/guyplus.payments.model.js';

/**
 * Base temporal en memoria (simulación de BD)
 */
const vendorPaymentsDB = [];

/**
 * ============================================
 *   REGISTRAR PAGO A VENDOR (GUY PLUS)
 * ============================================
 */
export const createVendorPaymentService = async (payload) => {
  try {
    const payment = new VendorPayment({
      id: uuidv4(),
      vendorId: payload.vendorId,
      amount: payload.amount,
      method: payload.method,
      description: payload.description || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: null
    });

    vendorPaymentsDB.push(payment);

    return {
      ok: true,
      message: 'Pago a vendor registrado correctamente',
      data: payment
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error al registrar pago a vendor',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   OBTENER PAGO DE VENDOR POR ID
 * ============================================
 */
export const getVendorPaymentService = async (id) => {
  try {
    const payment = vendorPaymentsDB.find((p) => p.id === id);

    if (!payment) {
      return {
        ok: false,
        message: 'Pago de vendor no encontrado'
      };
    }

    return {
      ok: true,
      data: payment
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error al obtener pago de vendor',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   ACTUALIZAR PAGO DE VENDOR
 * ============================================
 */
export const updateVendorPaymentService = async (id, payload) => {
  try {
    const index = vendorPaymentsDB.findIndex((p) => p.id === id);

    if (index === -1) {
      return {
        ok: false,
        message: 'Pago de vendor no encontrado'
      };
    }

    vendorPaymentsDB[index] = {
      ...vendorPaymentsDB[index],
      ...payload,
      updatedAt: new Date().toISOString()
    };

    return {
      ok: true,
      message: 'Pago de vendor actualizado correctamente',
      data: vendorPaymentsDB[index]
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error al actualizar pago de vendor',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   ELIMINAR PAGO DE VENDOR
 * ============================================
 */
export const deleteVendorPaymentService = async (id) => {
  try {
    const index = vendorPaymentsDB.findIndex((p) => p.id === id);

    if (index === -1) {
      return {
        ok: false,
        message: 'Pago de vendor no encontrado'
      };
    }

    const deleted = vendorPaymentsDB.splice(index, 1)[0];

    return {
      ok: true,
      message: 'Pago de vendor eliminado correctamente',
      data: deleted
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error al eliminar pago de vendor',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   LISTAR TODOS LOS PAGOS DE VENDORS
 * ============================================
 */
export const listVendorPaymentsService = async () => {
  try {
    return {
      ok: true,
      data: vendorPaymentsDB
    };
  } catch (err) {
    return {
      ok: false,
      message: 'Error al listar pagos de vendors',
      error: err.message
    };
  }
};
