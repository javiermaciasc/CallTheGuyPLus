// backend/services/stores.order.service.js

import { storeOrdersRepository } from '../repository/stores.repository.js';
import { storesRepository } from '../repository/stores.repository.js';
import { storeProductsRepository } from '../repository/stores.repository.js';

/**
 * ============================================
 *   CREAR ORDEN DE MATERIALES (TIENDAS GRANDES)
 * ============================================
 */
export const createStoreOrderService = async (payload) => {
  try {
    const { store, items, notes } = payload;

    if (!store) {
      return { ok: false, message: 'La tienda es obligatoria' };
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return { ok: false, message: 'Debe incluir al menos un material' };
    }

    const storeExists = storesRepository.list().find((s) => s.name === store);

    if (!storeExists) {
      return { ok: false, message: `La tienda ${store} no está registrada` };
    }

    const order = storeOrdersRepository.create({
      store,
      items,
      notes
    });

    return {
      ok: true,
      message: 'Orden de materiales creada correctamente',
      data: order
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno al crear orden de tienda',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   OBTENER ORDEN DE TIENDA POR ID
 * ============================================
 */
export const getStoreOrderService = async (id) => {
  try {
    const order = storeOrdersRepository.findById(id);

    if (!order) {
      return { ok: false, message: 'Orden no encontrada' };
    }

    return { ok: true, data: order };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno al obtener orden de tienda',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   ACTUALIZAR ORDEN DE TIENDA
 * ============================================
 */
export const updateStoreOrderService = async (id, payload) => {
  try {
    const order = storeOrdersRepository.update(id, payload);

    if (!order) {
      return { ok: false, message: 'Orden no encontrada' };
    }

    return {
      ok: true,
      message: 'Orden actualizada correctamente',
      data: order
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno al actualizar orden de tienda',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   ELIMINAR ORDEN DE TIENDA
 * ============================================
 */
export const deleteStoreOrderService = async (id) => {
  try {
    const order = storeOrdersRepository.delete(id);

    if (!order) {
      return { ok: false, message: 'Orden no encontrada' };
    }

    return {
      ok: true,
      message: 'Orden eliminada correctamente',
      data: order
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno al eliminar orden de tienda',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   LISTAR TODAS LAS ORDENES DE TIENDAS
 * ============================================
 */
export const listStoreOrdersService = async () => {
  try {
    const orders = storeOrdersRepository.list();

    return {
      ok: true,
      data: orders
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno al listar órdenes de tiendas',
      error: err.message
    };
  }
};
