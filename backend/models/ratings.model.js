// backend/models/ratings.model.js

/**
 * ============================================================
 *   MODELO: RATINGS
 *   SECCIÓN 9 — Calificación del cliente hacia el Guy
 *   SECCIÓN 10 — Calificación del Guy hacia el cliente
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

export const ratingsModel = {
  /**
   * ============================================================
   *   NORMALIZAR RATING
   * ============================================================
   * Asegura que todos los campos existan y tengan valores válidos.
   */
  normalize(data) {
    return {
      id: data.id || null,

      raterId: data.raterId || null,          // quien califica
      raterType: data.raterType || null,      // 'client' | 'guy'

      rateeId: data.rateeId || null,          // quien recibe la calificación
      rateeType: data.rateeType || null,      // 'client' | 'guy'

      jobId: data.jobId || null,

      stars: typeof data.stars === 'number' ? data.stars : null,
      comment: data.comment || '',

      evidencePdf: data.evidencePdf || null,  // obligatorio si ≤2 estrellas

      createdAt: data.createdAt || new Date().toISOString()
    };
  },

  /**
   * ============================================================
   *   VALIDAR RATING
   * ============================================================
   * Valida que un registro de rating tenga los campos mínimos
   * necesarios para existir en la base de datos.
   */
  validate(data) {
    const errors = [];

    // raterId obligatorio
    if (!data.raterId || typeof data.raterId !== 'string') {
      errors.push('raterId es obligatorio y debe ser string.');
    }

    // raterType obligatorio
    if (!data.raterType || typeof data.raterType !== 'string') {
      errors.push('raterType es obligatorio y debe ser string (client|guy).');
    }

    // rateeId obligatorio
    if (!data.rateeId || typeof data.rateeId !== 'string') {
      errors.push('rateeId es obligatorio y debe ser string.');
    }

    // rateeType obligatorio
    if (!data.rateeType || typeof data.rateeType !== 'string') {
      errors.push('rateeType es obligatorio y debe ser string (client|guy).');
    }

    // jobId obligatorio
    if (!data.jobId || typeof data.jobId !== 'string') {
      errors.push('jobId es obligatorio y debe ser string.');
    }

    // stars obligatorio
    if (typeof data.stars !== 'number' || data.stars < 1 || data.stars > 5) {
      errors.push('stars es obligatorio y debe ser un número entre 1 y 5.');
    }

    // comment obligatorio
    if (!data.comment || typeof data.comment !== 'string') {
      errors.push('comment es obligatorio y debe ser string.');
    }

    // evidencia PDF obligatoria si ≤2 estrellas
    if (data.stars <= 2 && !data.evidencePdf) {
      errors.push('evidencePdf es obligatorio cuando las estrellas son ≤ 2.');
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
