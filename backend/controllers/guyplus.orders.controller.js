// backend/controllers/guyplus.orders.controller.js

import {
  createVendorOrderService,
  getVendorOrderService,
  updateVendorOrderService,
  deleteVendorOrderService,
  listVendorOrdersService
} from '../services/guyplus.orders.service.js';

/**
 * ============================================
 *   CREAR ORDEN DE VENDOR (GUY PLUS)
 * ============================================
 */
export const createVendorOrder = async (req, res) => {
  try {
    const payload = req.body;
    const result = await createVendorOrderService(payload);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al crear orden del vendor',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   OBTENER ORDEN DE VENDOR POR ID
 * ============================================
 */
export const getVendorOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getVendorOrderService(id);

    if (!result.ok) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener orden del vendor',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   ACTUALIZAR ORDEN DE VENDOR
 * ============================================
 */
export const updateVendorOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const result = await updateVendorOrderService(id, payload);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al actualizar orden del vendor',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   ELIMINAR ORDEN DE VENDOR
 * ============================================
 */
export const deleteVendorOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteVendorOrderService(id);

    if (!result.ok) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al eliminar orden del vendor',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   LISTAR TODAS LAS ORDENES DE VENDORS
 * ============================================
 */
export const listVendorOrders = async (req, res) => {
  try {
    const result = await listVendorOrdersService();

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al listar órdenes de vendors',
      error: err.message
    });
  }
};
