// backend/models/disputes.model.js

/**
 * ============================================
 *   MODELO: DISPUTAS
 *   SECCIÓN 8 — Cliente abre disputa / Guy responde
 * ============================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

export const disputesModel = {
  /**
   * Normaliza un registro de disputa para asegurar
   * que todos los campos existan y tengan valores válidos.
   */
  normalize(data) {
    return {
      id: data.id || null,

      jobId: data.jobId || null,
      clientId: data.clientId || null,
      guyId: data.guyId || null,

      reason: data.reason || '',
      description: data.description || '',

      response: data.response || null,

      status: data.status || 'open',

      createdAt: data.createdAt || new Date().toISOString(),
      respondedAt: data.respondedAt || null
    };
  },

  /**
   * Valida que un registro de disputa tenga los campos mínimos
   * necesarios para existir en la base de datos.
   */
  validate(data) {
    const errors = [];

    if (!data.jobId || typeof data.jobId !== 'string') {
      errors.push('jobId es obligatorio y debe ser string.');
    }

    if (!data.clientId || typeof data.clientId !== 'string') {
      errors.push('clientId es obligatorio y debe ser string.');
    }

    if (!data.guyId || typeof data.guyId !== 'string') {
      errors.push('guyId es obligatorio y debe ser string.');
    }

    if (!data.reason || typeof data.reason !== 'string') {
      errors.push('reason es obligatorio y debe ser string.');
    }

    if (!data.description || typeof data.description !== 'string') {
      errors.push('description es obligatorio y debe ser string.');
    }

    if (!data.createdAt || typeof data.createdAt !== 'string') {
      errors.push('createdAt es obligatorio y debe ser string (ISO date).');
    }

    if (data.response && typeof data.response !== 'string') {
      errors.push('response debe ser string si se proporciona.');
    }

    if (data.respondedAt && typeof data.respondedAt !== 'string') {
      errors.push('respondedAt debe ser string (ISO date) si se proporciona.');
    }

    if (!data.status || typeof data.status !== 'string') {
      errors.push('status es obligatorio y debe ser string.');
    }

    return {
      ok: errors.length === 0,
      errors
    };
  },

  /**
   * Crea un objeto listo para insertar en la base de datos.
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
