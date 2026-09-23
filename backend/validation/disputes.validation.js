// backend/validation/disputes.validation.js

/**
 * ============================================
 *   VALIDACIÓN: DISPUTAS
 *   SECCIÓN 8 — Cliente abre disputa / Guy responde
 * ============================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

/**
 * ============================================
 *   VALIDAR CREACIÓN DE DISPUTA (CLIENTE)
 * ============================================
 */
export const validateCreateDispute = (data) => {
  const errors = [];

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

  // reason obligatorio
  if (!data.reason || typeof data.reason !== 'string') {
    errors.push('reason es obligatorio y debe ser string.');
  }

  // description obligatorio
  if (!data.description || typeof data.description !== 'string') {
    errors.push('description es obligatorio y debe ser string.');
  }

  // createdAt obligatorio
  if (!data.createdAt || typeof data.createdAt !== 'string') {
    errors.push('createdAt es obligatorio y debe ser string (ISO date).');
  }

  // status obligatorio
  if (!data.status || typeof data.status !== 'string') {
    errors.push('status es obligatorio y debe ser string.');
  }

  return {
    ok: errors.length === 0,
    errors
  };
};

/**
 * ============================================
 *   VALIDAR RESPUESTA DE DISPUTA (GUY)
 * ============================================
 */
export const validateRespondDispute = (data) => {
  const errors = [];

  // disputeId obligatorio
  if (!data.disputeId || typeof data.disputeId !== 'string') {
    errors.push('disputeId es obligatorio y debe ser string.');
  }

  // guyId obligatorio
  if (!data.guyId || typeof data.guyId !== 'string') {
    errors.push('guyId es obligatorio y debe ser string.');
  }

  // response obligatorio
  if (!data.response || typeof data.response !== 'string') {
    errors.push('response es obligatorio y debe ser string.');
  }

  // respondedAt obligatorio
  if (!data.respondedAt || typeof data.respondedAt !== 'string') {
    errors.push('respondedAt es obligatorio y debe ser string (ISO date).');
  }

  // status obligatorio
  if (!data.status || typeof data.status !== 'string') {
    errors.push('status es obligatorio y debe ser string.');
  }

  return {
    ok: errors.length === 0,
    errors
  };
};
