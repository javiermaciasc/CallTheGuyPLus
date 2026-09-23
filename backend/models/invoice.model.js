// backend/models/invoice.model.js

/**
 * ============================================================
 *   MODELO: FACTURA BASADA EN PO
 *   SECCIÓN 11 — Mostrar factura
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

export const invoiceModel = {
  /**
   * ============================================================
   *   NORMALIZAR FACTURA
   * ============================================================
   * Asegura que todos los campos existan y tengan valores válidos.
   */
  normalize(data) {
    return {
      invoiceId: data.invoiceId || null,
      poNumber: data.poNumber || null,

      clientId: data.clientId || null,
      clientName: data.clientName || null,

      date: data.date || new Date().toISOString(),

      items: Array.isArray(data.items) ? data.items : [],

      total: typeof data.total === 'number' ? data.total : 0
    };
  },

  /**
   * ============================================================
   *   VALIDAR FACTURA
   * ============================================================
   * Valida que un registro de factura tenga los campos mínimos
   * necesarios para existir en la base de datos.
   */
  validate(data) {
    const errors = [];

    // invoiceId obligatorio
    if (!data.invoiceId || typeof data.invoiceId !== 'string') {
      errors.push('invoiceId es obligatorio y debe ser string.');
    }

    // poNumber obligatorio
    if (!data.poNumber || typeof data.poNumber !== 'string') {
      errors.push('poNumber es obligatorio y debe ser string.');
    }

    // clientId obligatorio
    if (!data.clientId || typeof data.clientId !== 'string') {
      errors.push('clientId es obligatorio y debe ser string.');
    }

    // clientName obligatorio
    if (!data.clientName || typeof data.clientName !== 'string') {
      errors.push('clientName es obligatorio y debe ser string.');
    }

    // date obligatorio
    if (!data.date || typeof data.date !== 'string') {
      errors.push('date es obligatorio y debe ser string (ISO date).');
    }

    // items obligatorio
    if (!Array.isArray(data.items)) {
      errors.push('items debe ser un arreglo.');
    } else if (data.items.length === 0) {
      errors.push('items no puede estar vacío.');
    }

    // validar cada item
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

    // total obligatorio
    if (typeof data.total !== 'number' || data.total < 0) {
      errors.push('total debe ser número mayor o igual a 0.');
    }

    return {
      ok: errors.length === 0,
      errors
    };
  },

  /**
   * ============================================================
   *   CREAR OBJETO LISTO PARA BASE DE DATOS
   * ============================================================
   */
  create(data) {
    const normalized = this.normalize(data);
    const validation = this.validate(normalized);

    if (!validation.ok) {
      return {
        ok: false,
        errors: validation.errors
      };
    }

    return {
      ok: true,
      data: normalized
    };
  }
};
