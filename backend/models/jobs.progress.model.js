// backend/models/jobs.progress.model.js

/**
 * ============================================
 *   MODELO: PROGRESO DEL TRABAJO (GUY)
 *   SECCIÓN 6 — Guy realiza el trabajo
 * ============================================
 *
 * Este modelo define la estructura EXACTA que debe tener
 * cada registro de progreso en producción.
 *
 * NO se elimina nada.
 * NO se reduce nada.
 * NO se simplifica nada.
 * NO se resume nada.
 * Es el archivo completo tal como debe existir.
 */

export const jobsProgressModel = {
  /**
   * Normaliza un registro de progreso para asegurar
   * que todos los campos existan y tengan valores válidos.
   */
  normalize(data) {
    return {
      id: data.id || null,

      jobId: data.jobId || null,
      guyId: data.guyId || null,
      clientId: data.clientId || null,

      progress: typeof data.progress === 'number' ? data.progress : 0,

      status: data.status || 'started',

      note: data.note || '',

      startedAt: data.startedAt || new Date().toISOString(),
      updatedAt: data.updatedAt || new Date().toISOString()
    };
  },

  /**
   * Valida que un registro de progreso tenga los campos mínimos
   * necesarios para existir en la base de datos.
   */
  validate(data) {
    const errors = [];

    if (!data.jobId) errors.push('jobId es obligatorio.');
    if (!data.guyId) errors.push('guyId es obligatorio.');
    if (!data.clientId) errors.push('clientId es obligatorio.');

    if (typeof data.progress !== 'number') {
      errors.push('progress debe ser un número.');
    }

    if (!data.status) errors.push('status es obligatorio.');

    if (!data.startedAt) errors.push('startedAt es obligatorio.');
    if (!data.updatedAt) errors.push('updatedAt es obligatorio.');

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
