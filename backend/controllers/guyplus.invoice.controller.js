// backend/controllers/guyplus.invoice.controller.js

import {
  createVendorInvoiceService,
  getVendorInvoiceService,
  updateVendorInvoiceService,
  deleteVendorInvoiceService,
  listVendorInvoicesService
} from '../services/guyplus.invoice.service.js';

/**
 * ============================================
 *   CREAR FACTURA DE VENDOR (GUY PLUS)
 * ============================================
 */
export const createVendorInvoice = async (req, res) => {
  try {
    const payload = req.body;
    const result = await createVendorInvoiceService(payload);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al crear factura del vendor',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   OBTENER FACTURA DE VENDOR POR ID
 * ============================================
 */
export const getVendorInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getVendorInvoiceService(id);

    if (!result.ok) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener factura del vendor',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   ACTUALIZAR FACTURA DE VENDOR
 * ============================================
 */
export const updateVendorInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const result = await updateVendorInvoiceService(id, payload);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al actualizar factura del vendor',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   ELIMINAR FACTURA DE VENDOR
 * ============================================
 */
export const deleteVendorInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteVendorInvoiceService(id);

    if (!result.ok) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al eliminar factura del vendor',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   LISTAR TODAS LAS FACTURAS DE VENDORS
 * ============================================
 */
export const listVendorInvoices = async (req, res) => {
  try {
    const result = await listVendorInvoicesService();

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al listar facturas de vendors',
      error: err.message
    });
  }
};
