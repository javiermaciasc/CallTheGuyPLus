// backend/validation/ratings.validation.js

/**
 * ============================================================
 *   VALIDACIÓN: RATINGS
 *   SECCIÓN 9 — Calificación del cliente hacia el Guy
 *   SECCIÓN 10 — Calificación del Guy hacia el cliente
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

export const validateRating = (data) => {
  const errors = [];

  /**
   * ============================================================
   *   VALIDAR RATER (QUIEN CALIFICA)
   * ============================================================
   */

  if (!data.raterId || typeof data.raterId !== 'string') {
    errors.push('raterId es obligatorio y debe ser string.');
  }

  if (!data.raterType || typeof data.raterType !== 'string') {
    errors.push('raterType es obligatorio y debe ser string (client|guy).');
  } else if (!['client', 'guy'].includes(data.raterType)) {
    errors.push('raterType debe ser "client" o "guy".');
  }

  /**
   * ============================================================
   *   VALIDAR RATEE (QUIEN RECIBE LA CALIFICACIÓN)
   * ============================================================
   */

  if (!data.rateeId || typeof data.rateeId !== 'string') {
    errors.push('rateeId es obligatorio y debe ser string.');
  }

  if (!data.rateeType || typeof data.rateeType !== 'string') {
    errors.push('rateeType es obligatorio y debe ser string (client|guy).');
  } else if (!['client', 'guy'].includes(data.rateeType)) {
    errors.push('rateeType debe ser "client" o "guy".');
  }

  /**
   * ============================================================
   *   VALIDAR JOB
   * ============================================================
   */

  if (!data.jobId || typeof data.jobId !== 'string') {
    errors.push('jobId es obligatorio y debe ser string.');
  }

  /**
   * ============================================================
   *   VALIDAR ESTRELLAS
   * ============================================================
   */

  if (typeof data.stars !== 'number') {
    errors.push('stars es obligatorio y debe ser número.');
  } else if (data.stars < 1 || data.stars > 5) {
    errors.push('stars debe estar entre 1 y 5.');
  }

  /**
   * ============================================================
   *   VALIDAR COMENTARIO
   * ============================================================
   */

  if (!data.comment || typeof data.comment !== 'string') {
    errors.push('comment es obligatorio y debe ser string.');
  }

  /**
   * ============================================================
   *   VALIDAR PDF OBLIGATORIO SI ≤ 2 ESTRELLAS
   * ============================================================
   */

  if (data.stars <= 2 && !data.evidencePdf) {
    errors.push('evidencePdf es obligatorio cuando las estrellas son ≤ 2.');
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
