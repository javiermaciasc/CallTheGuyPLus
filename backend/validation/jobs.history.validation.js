// backend/validation/jobs.history.validation.js

/**
 * ============================================================
 *   VALIDACIÓN: HISTORIAL DE TRABAJO PERMANENTE
 *   SECCIÓN 12 — Trabajo permanente (NO se borra jamás)
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

export const validateHistory = (data) => {
  const errors = [];

  /**
   * ============================================================
   *   VALIDAR HISTORY ID
   * ============================================================
   */
  if (!data.historyId || typeof data.historyId !== 'string') {
    errors.push('historyId es obligatorio y debe ser string.');
  }

  /**
   * ============================================================
   *   VALIDAR JOB ID
   * ============================================================
   */
  if (!data.jobId || typeof data.jobId !== 'string') {
    errors.push('jobId es obligatorio y debe ser string.');
  }

  /**
   * ============================================================
   *   VALIDAR CLIENTE
   * ============================================================
   */
  if (!data.clientId || typeof data.clientId !== 'string') {
    errors.push('clientId es obligatorio y debe ser string.');
  }

  /**
   * ============================================================
   *   VALIDAR GUY
   * ============================================================
   */
  if (!data.guyId || typeof data.guyId !== 'string') {
    errors.push('guyId es obligatorio y debe ser string.');
  }

  /**
   * ============================================================
   *   VALIDAR STATUS
   * ============================================================
   */
  if (!data.status || typeof data.status !== 'string') {
    errors.push('status es obligatorio y debe ser string.');
  } else if (!['pending', 'in_progress', 'completed', 'cancelled'].includes(data.status)) {
    errors.push('status debe ser uno de: pending, in_progress, completed, cancelled.');
  }

  /**
   * ============================================================
   *   VALIDAR NOTES
   * ============================================================
   */
  if (data.notes && typeof data.notes !== 'string') {
    errors.push('notes debe ser string.');
  }

  /**
   * ============================================================
   *   VALIDAR FECHA
   * ============================================================
   */
  if (!data.createdAt || typeof data.createdAt !== 'string') {
    errors.push('createdAt es obligatorio y debe ser string (ISO date).');
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
