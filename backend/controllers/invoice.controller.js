// backend/controllers/invoice.controller.js

/**
 * ============================================================
 *   CONTROLADOR: FACTURA BASADA EN PO
 *   SECCIÓN 11 — Mostrar factura
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import {
  getInvoiceByPOService,
  getInvoiceByIdService,
  getAllInvoicesService
} from '../services/invoice.service.js';

/**
 * ============================================================
 *   MOSTRAR FACTURA POR PO
 *   GET /invoice/po/:poNumber
 * ============================================================
 */
export const getInvoiceByPOController = async (req, res) => {
  try {
    const { poNumber } = req.params;

    const result = await getInvoiceByPOService(poNumber);

    if (!result.ok) {
      return res.status(404).json({
        ok: false,
        message: result.message,
        errors: result.errors || null
      });
    }

    return res.json({
      ok: true,
      data: result.data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener factura por PO',
      error: error.message
    });
  }
};

/**
 * ============================================================
 *   MOSTRAR FACTURA POR ID
 *   GET /invoice/:invoiceId
 * ============================================================
 */
export const getInvoiceByIdController = async (req, res) => {
  try {
    const { invoiceId } = req.params;

    const result = await getInvoiceByIdService(invoiceId);

    if (!result.ok) {
      return res.status(404).json({
        ok: false,
        message: result.message,
        errors: result.errors || null
      });
    }

    return res.json({
      ok: true,
      data: result.data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener factura por ID',
      error: error.message
    });
  }
};

/**
 * ============================================================
 *   MOSTRAR TODAS LAS FACTURAS
 *   GET /invoice/all
 * ============================================================
 */
export const getAllInvoicesController = async (req, res) => {
  try {
    const result = await getAllInvoicesService();

    if (!result.ok) {
      return res.status(404).json({
        ok: false,
        message: result.message
      });
    }

    return res.json({
      ok: true,
      data: result.data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al obtener todas las facturas',
      error: error.message
    });
  }
};
