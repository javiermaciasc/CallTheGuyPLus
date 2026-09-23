// backend/services/invoice.service.js

/**
 * ============================================================
 *   SERVICIO: FACTURA BASADA EN PO
 *   SECCIÓN 11 — Generar factura
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import {
  findInvoiceByPO,
  findInvoiceById,
  findAllInvoices,
  saveInvoice,
  saveInvoiceItems,
  findInvoiceItems
} from '../repository/invoice.repository.js';

import { invoiceModel } from '../models/invoice.model.js';

/**
 * ============================================================
 *   GENERAR FACTURA BASADA EN PO
 * ============================================================
 */
export const generateInvoiceService = async (payload) => {
  try {
    // Normalizar
    const normalized = invoiceModel.normalize(payload);

    // Validar
    const validation = invoiceModel.validate(normalized);

    if (!validation.ok) {
      return {
        ok: false,
        message: 'Validación fallida al generar factura',
        errors: validation.errors
      };
    }

    // Guardar factura
    const savedInvoice = await saveInvoice(normalized);

    if (!savedInvoice) {
      return {
        ok: false,
        message: 'No se pudo guardar la factura'
      };
    }

    // Guardar items
    const itemsSaved = await saveInvoiceItems(normalized.invoiceId, normalized.items);

    if (!itemsSaved) {
      return {
        ok: false,
        message: 'No se pudieron guardar los items de la factura'
      };
    }

    return {
      ok: true,
      data: normalized
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al generar factura',
      error: error.message
    };
  }
};

/**
 * ============================================================
 *   OBTENER FACTURA POR PO
 * ============================================================
 */
export const getInvoiceByPOService = async (poNumber) => {
  try {
    const invoice = await findInvoiceByPO(poNumber);

    if (!invoice) {
      return {
        ok: false,
        message: 'No existe factura para este PO'
      };
    }

    const items = await findInvoiceItems(invoice.invoiceId);

    return {
      ok: true,
      data: {
        ...invoice,
        items
      }
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al obtener factura por PO',
      error: error.message
    };
  }
};

/**
 * ============================================================
 *   OBTENER FACTURA POR ID
 * ============================================================
 */
export const getInvoiceByIdService = async (invoiceId) => {
  try {
    const invoice = await findInvoiceById(invoiceId);

    if (!invoice) {
      return {
        ok: false,
        message: 'No existe factura con este ID'
      };
    }

    const items = await findInvoiceItems(invoice.invoiceId);

    return {
      ok: true,
      data: {
        ...invoice,
        items
      }
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al obtener factura por ID',
      error: error.message
    };
  }
};

/**
 * ============================================================
 *   OBTENER TODAS LAS FACTURAS
 * ============================================================
 */
export const getAllInvoicesService = async () => {
  try {
    const invoices = await findAllInvoices();

    if (!invoices || invoices.length === 0) {
      return {
        ok: false,
        message: 'No existen facturas registradas'
      };
    }

    // Agregar items a cada factura
    const enriched = [];

    for (const invoice of invoices) {
      const items = await findInvoiceItems(invoice.invoiceId);

      enriched.push({
        ...invoice,
        items
      });
    }

    return {
      ok: true,
      data: enriched
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error interno al obtener todas las facturas',
      error: error.message
    };
  }
};
