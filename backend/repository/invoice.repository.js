// backend/repository/invoice.repository.js

/**
 * ============================================================
 *   REPOSITORIO: FACTURA BASADA EN PO
 *   SECCIÓN 11 — Mostrar factura
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import db from '../database/connection.js';

/**
 * ============================================================
 *   BUSCAR FACTURA POR PO
 * ============================================================
 */
export const findInvoiceByPO = async (poNumber) => {
  try {
    const query = `
      SELECT *
      FROM invoices
      WHERE poNumber = ?
      LIMIT 1
    `;

    const [rows] = await db.execute(query, [poNumber]);

    if (!rows || rows.length === 0) {
      return null;
    }

    return rows[0];

  } catch (error) {
    throw new Error('Error al buscar factura por PO: ' + error.message);
  }
};

/**
 * ============================================================
 *   BUSCAR FACTURA POR ID
 * ============================================================
 */
export const findInvoiceById = async (invoiceId) => {
  try {
    const query = `
      SELECT *
      FROM invoices
      WHERE invoiceId = ?
      LIMIT 1
    `;

    const [rows] = await db.execute(query, [invoiceId]);

    if (!rows || rows.length === 0) {
      return null;
    }

    return rows[0];

  } catch (error) {
    throw new Error('Error al buscar factura por ID: ' + error.message);
  }
};

/**
 * ============================================================
 *   BUSCAR TODAS LAS FACTURAS
 * ============================================================
 */
export const findAllInvoices = async () => {
  try {
    const query = `
      SELECT *
      FROM invoices
      ORDER BY date DESC
    `;

    const [rows] = await db.execute(query);

    return rows;

  } catch (error) {
    throw new Error('Error al obtener todas las facturas: ' + error.message);
  }
};

/**
 * ============================================================
 *   GUARDAR FACTURA
 * ============================================================
 */
export const saveInvoice = async (invoiceData) => {
  try {
    const query = `
      INSERT INTO invoices (
        invoiceId,
        poNumber,
        clientId,
        clientName,
        date,
        total
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;

    const params = [
      invoiceData.invoiceId,
      invoiceData.poNumber,
      invoiceData.clientId,
      invoiceData.clientName,
      invoiceData.date,
      invoiceData.total
    ];

    const [result] = await db.execute(query, params);

    return result.insertId ? invoiceData : null;

  } catch (error) {
    throw new Error('Error al guardar factura: ' + error.message);
  }
};

/**
 * ============================================================
 *   GUARDAR ITEMS DE FACTURA
 * ============================================================
 */
export const saveInvoiceItems = async (invoiceId, items) => {
  try {
    const query = `
      INSERT INTO invoice_items (
        invoiceId,
        description,
        quantity,
        price
      ) VALUES (?, ?, ?, ?)
    `;

    for (const item of items) {
      await db.execute(query, [
        invoiceId,
        item.description,
        item.quantity,
        item.price
      ]);
    }

    return true;

  } catch (error) {
    throw new Error('Error al guardar items de factura: ' + error.message);
  }
};

/**
 * ============================================================
 *   OBTENER ITEMS DE UNA FACTURA
 * ============================================================
 */
export const findInvoiceItems = async (invoiceId) => {
  try {
    const query = `
      SELECT *
      FROM invoice_items
      WHERE invoiceId = ?
    `;

    const [rows] = await db.execute(query, [invoiceId]);

    return rows;

  } catch (error) {
    throw new Error('Error al obtener items de factura: ' + error.message);
  }
};
