// backend/services/guyplus.benefits.service.js

import { v4 as uuidv4 } from 'uuid';
import { VendorBenefit } from '../models/guyplus.benefits.model.js';

/**
 * Base temporal en memoria (simulación de BD)
 */
const vendorBenefitsDB = [];

/**
 * ============================================
 *   CREAR BENEFICIO PARA VENDOR (GUY PLUS)
 * ============================================
 */
export const createVendorBenefitService = async (payload) => {
  try {
    const benefit = new VendorBenefit({
      id: uuidv4(),
      vendorId: payload.vendorId,
      title: payload.title,
      description: payload.description || '',
      active: payload.active ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: null
    });

    vendorBenefitsDB.push(benefit);

    return {
      ok: true,
      message: 'Beneficio creado correctamente para el vendor',
      data: benefit
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error al crear beneficio del vendor',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   OBTENER BENEFICIO POR ID
 * ============================================
 */
export const getVendorBenefitService = async (id) => {
  try {
    const benefit = vendorBenefitsDB.find((b) => b.id === id);

    if (!benefit) {
      return {
        ok: false,
        message: 'Beneficio no encontrado'
      };
    }

    return {
      ok: true,
      data: benefit
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error al obtener beneficio del vendor',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   ACTUALIZAR BENEFICIO DE VENDOR
 * ============================================
 */
export const updateVendorBenefitService = async (id, payload) => {
  try {
    const index = vendorBenefitsDB.findIndex((b) => b.id === id);

    if (index === -1) {
      return {
        ok: false,
        message: 'Beneficio no encontrado'
      };
    }

    vendorBenefitsDB[index] = {
      ...vendorBenefitsDB[index],
      ...payload,
      updatedAt: new Date().toISOString()
    };

    return {
      ok: true,
      message: 'Beneficio actualizado correctamente',
      data: vendorBenefitsDB[index]
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error al actualizar beneficio del vendor',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   ELIMINAR BENEFICIO DE VENDOR
 * ============================================
 */
export const deleteVendorBenefitService = async (id) => {
  try {
    const index = vendorBenefitsDB.findIndex((b) => b.id === id);

    if (index === -1) {
      return {
        ok: false,
        message: 'Beneficio no encontrado'
      };
    }

    const deleted = vendorBenefitsDB.splice(index, 1)[0];

    return {
      ok: true,
      message: 'Beneficio eliminado correctamente',
      data: deleted
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error al eliminar beneficio del vendor',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   LISTAR TODOS LOS BENEFICIOS DE VENDORS
 * ============================================
 */
export const listVendorBenefitsService = async () => {
  try {
    return {
      ok: true,
      data: vendorBenefitsDB
    };
  } catch (err) {
    return {
      ok: false,
      message: 'Error al listar beneficios de vendors',
      error: err.message
    };
  }
};
