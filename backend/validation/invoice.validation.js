// backend/validation/invoice.validation.js

/**
 * ============================================================
 *   VALIDACIÓN: FACTURA BASADA EN PO
 *   SECCIÓN 11 — Validación de factura
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

export const validateInvoice = (data) => {
  const errors = [];

  /**
   * ============================================================
   *   VALIDAR CAMPOS PRINCIPALES
   * ============================================================
   */

  if (!data.invoiceId || typeof data.invoiceId !== 'string') {
    errors.push('invoiceId es obligatorio y debe ser string.');
  }

  if (!data.poNumber || typeof data.poNumber !== 'string') {
    errors.push('poNumber es obligatorio y debe ser string.');
  }

  if (!data.clientId || typeof data.clientId !== 'string') {
    errors.push('clientId es obligatorio y debe ser string.');
  }

  if (!data.clientName || typeof data.clientName !== 'string') {
    errors.push('clientName es obligatorio y debe ser string.');
  }

  if (!data.date || typeof data.date !== 'string') {
    errors.push('date es obligatorio y debe ser string (ISO date).');
  }

  /**
   * ============================================================
   *   VALIDAR ITEMS
   * ============================================================
   */

  if (!Array.isArray(data.items)) {
    errors.push('items debe ser un arreglo.');
  } else if (data.items.length === 0) {
    errors.push('items no puede estar vacío.');
  } else {
    data.items.forEach((item, index) => {
      if (!item.description || typeof item.description !== 'string') {
        errors.push(`items[${index}].description es obligatorio y debe ser string.`);
      }

      if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        errors.push(`items[${index}].quantity debe ser número mayor a 0.`);
      }

      if (typeof item.price !== 'number' || item.price < 0) {
        errors.push(`items[${index}].price debe ser número mayor o igual a 0.`);
      }
    });
  }

  /**
   * ============================================================
   *   VALIDAR TOTAL
   * ============================================================
   */

  if (typeof data.total !== 'number' || data.total < 0) {
    errors.push('total debe ser número mayor o igual a 0.');
  }

  /**
   * ============================================================
   *   RETORNAR RESULTADO
   * ============================================================
   */

  return {
    ok: errors.length === 0,
    errors
  };
};
