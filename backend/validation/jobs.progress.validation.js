// backend/validation/jobs.progress.validation.js

/**
 * ============================================
 *   VALIDACIÓN: PROGRESO DEL TRABAJO (GUY)
 *   SECCIÓN 6 — Guy realiza el trabajo
 * ============================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

/**
 * ============================================
 *   VALIDAR INICIO DEL TRABAJO
 * ============================================
 */
export const validateJobProgressStart = (data) => {
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

  if (!data.startedAt || typeof data.startedAt !== 'string') {
    errors.push('startedAt es obligatorio y debe ser string (ISO date).');
  }

  return {
    ok: errors.length === 0,
    errors
  };
};

/**
 * ============================================
 *   VALIDAR ACTUALIZACIÓN DE PROGRESO
 * ============================================
 */
export const validateJobProgressUpdate = (data) => {
  const errors = [];

  if (!data.jobId || typeof data.jobId !== 'string') {
    errors.push('jobId es obligatorio y debe ser string.');
  }

  if (!data.guyId || typeof data.guyId !== 'string') {
    errors.push('guyId es obligatorio y debe ser string.');
  }

  if (typeof data.progress !== 'number') {
    errors.push('progress debe ser un número.');
  }

  if (data.progress < 0 || data.progress > 100) {
    errors.push('progress debe estar entre 0 y 100.');
  }

  if (!data.status || typeof data.status !== 'string') {
    errors.push('status es obligatorio y debe ser string.');
  }

  if (!data.updatedAt || typeof data.updatedAt !== 'string') {
    errors.push('updatedAt es obligatorio y debe ser string (ISO date).');
  }

  if (data.note && typeof data.note !== 'string') {
    errors.push('note debe ser string si se proporciona.');
  }

  return {
    ok: errors.length === 0,
    errors
  };
};
