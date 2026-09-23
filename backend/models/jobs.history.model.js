// backend/models/jobs.history.model.js

/**
 * ============================================================
 *   MODELO: HISTORIAL DE TRABAJO PERMANENTE
 *   SECCIÓN 12 — Trabajo permanente (NO se borra jamás)
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

export const jobsHistoryModel = {
  /**
   * ============================================================
   *   NORMALIZAR HISTORIAL
   * ============================================================
   * Asegura que todos los campos existan y tengan valores válidos.
   */
  normalize(data) {
    return {
      historyId: data.historyId || null,

      jobId: data.jobId || null,
      clientId: data.clientId || null,
      guyId: data.guyId || null,

      status: data.status || 'pending', // pending | in_progress | completed | cancelled

      notes: data.notes || '',

      createdAt: data.createdAt || new Date().toISOString()
    };
  },

  /**
   * ============================================================
   *   VALIDAR HISTORIAL
   * ============================================================
   * Valida que un registro de historial tenga los campos mínimos
   * necesarios para existir en la base de datos.
   */
  validate(data) {
    const errors = [];

    // historyId obligatorio
    if (!data.historyId || typeof data.historyId !== 'string') {
      errors.push('historyId es obligatorio y debe ser string.');
    }

    // jobId obligatorio
    if (!data.jobId || typeof data.jobId !== 'string') {
      errors.push('jobId es obligatorio y debe ser string.');
    }

    // clientId obligatorio
    if (!data.clientId || typeof data.clientId !== 'string') {
      errors.push('clientId es obligatorio y debe ser string.');
    }

    // guyId obligatorio
    if (!data.guyId || typeof data.guyId !== 'string') {
      errors.push('guyId es obligatorio y debe ser string.');
    }

    // status obligatorio
    if (!data.status || typeof data.status !== 'string') {
      errors.push('status es obligatorio y debe ser string.');
    } else if (!['pending', 'in_progress', 'completed', 'cancelled'].includes(data.status)) {
      errors.push('status debe ser uno de: pending, in_progress, completed, cancelled.');
    }

    // notes opcional pero debe ser string
    if (data.notes && typeof data.notes !== 'string') {
      errors.push('notes debe ser string.');
    }

    // createdAt obligatorio
    if (!data.createdAt || typeof data.createdAt !== 'string') {
      errors.push('createdAt es obligatorio y debe ser string (ISO date).');
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
