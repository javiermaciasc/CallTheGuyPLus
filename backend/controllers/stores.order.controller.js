// backend/controllers/stores.order.controller.js

import {
  createStoreOrderService,
  getStoreOrderService,
  updateStoreOrderService,
  deleteStoreOrderService,
  listStoreOrdersService
} from '../services/stores.order.service.js';

/**
 * ============================================
 *   CREAR ORDEN DE MATERIAL (TIENDAS GRANDES)
 * ============================================
 *   - Home Depot
 *   - Lowe's
 *   - Menards (si aplica)
 * ============================================
 */
export const createStoreOrder = async (req, res) => {
  try {
    const payload = req.body;
    const result = await createStoreOrderService(payload);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al crear orden de tienda',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   OBTENER ORDEN DE TIENDA POR ID
 * ============================================
 */
export const getStoreOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getStoreOrderService(id);

    if (!result.ok) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener orden de tienda',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   ACTUALIZAR ORDEN DE TIENDA
 * ============================================
 */
export const updateStoreOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const result = await updateStoreOrderService(id, payload);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al actualizar orden de tienda',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   ELIMINAR ORDEN DE TIENDA
 * ============================================
 */
export const deleteStoreOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteStoreOrderService(id);

    if (!result.ok) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al eliminar orden de tienda',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   LISTAR TODAS LAS ORDENES DE TIENDAS
 * ============================================
 */
export const listStoreOrders = async (req, res) => {
  try {
    const result = await listStoreOrdersService();

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al listar órdenes de tiendas',
      error: err.message
    });
  }
};
