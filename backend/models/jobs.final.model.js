// backend/models/jobs.final.model.js

/**
 * ============================================
 *   MODELO: FOTOS FINALES DEL TRABAJO
 *   SECCIÓN 7 — Guy sube fotos finales
 * ============================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

export const jobsFinalModel = {
  /**
   * Normaliza un registro de fotos finales para asegurar
   * que todos los campos existan y tengan valores válidos.
   */
  normalize(data) {
    return {
      id: data.id || null,

      jobId: data.jobId || null,
      guyId: data.guyId || null,
      clientId: data.clientId || null,

      photos: Array.isArray(data.photos) ? data.photos : [],

      uploadedAt: data.uploadedAt || new Date().toISOString()
    };
  },

  /**
   * Valida que un registro de fotos finales tenga los campos mínimos
   * necesarios para existir en la base de datos.
   */
  validate(data) {
    const errors = [];

    if (!data.jobId || typeof data.jobId !== 'string') {
      errors.push('jobId es obligatorio y debe ser string.');
    }

    if (!data.guyId || typeof data.guyId !== 'string') {
      errors.push('guyId es obligatorio y debe ser string.');
    }

    if (!data.clientId || typeof data.clientId !== 'string') {
      errors.push('clientId es obligatorio y debe ser string.');
    }

    if (!Array.isArray(data.photos)) {
      errors.push('photos debe ser un arreglo.');
    }

    if (Array.isArray(data.photos) && data.photos.length === 0) {
      errors.push('Debe incluir al menos una foto final.');
    }

    if (!data.uploadedAt || typeof data.uploadedAt !== 'string') {
      errors.push('uploadedAt es obligatorio y debe ser string (ISO date).');
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
