// backend/validation/jobs.final.validation.js

/**
 * ============================================
 *   VALIDACIÓN: FOTOS FINALES DEL TRABAJO
 *   SECCIÓN 7 — Guy sube fotos finales (OBLIGATORIAS)
 * ============================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

/**
 * ============================================
 *   VALIDAR SUBIDA DE FOTOS FINALES
 * ============================================
 */
export const validateFinalPhotosUpload = (data) => {
  const errors = [];

  // jobId obligatorio
  if (!data.jobId || typeof data.jobId !== 'string') {
    errors.push('jobId es obligatorio y debe ser string.');
  }

  // guyId obligatorio
  if (!data.guyId || typeof data.guyId !== 'string') {
    errors.push('guyId es obligatorio y debe ser string.');
  }

  // clientId obligatorio
  if (!data.clientId || typeof data.clientId !== 'string') {
    errors.push('clientId es obligatorio y debe ser string.');
  }

  // photos obligatorio y debe ser array
  if (!Array.isArray(data.photos)) {
    errors.push('photos debe ser un arreglo.');
  }

  // al menos una foto
  if (Array.isArray(data.photos) && data.photos.length === 0) {
    errors.push('Debe incluir al menos una foto final.');
  }

  // cada foto debe ser string
  if (Array.isArray(data.photos)) {
    data.photos.forEach((photo, index) => {
      if (typeof photo !== 'string') {
        errors.push(`La foto en índice ${index} debe ser string (URL o base64).`);
      }
    });
  }

  // uploadedAt obligatorio
  if (!data.uploadedAt || typeof data.uploadedAt !== 'string') {
    errors.push('uploadedAt es obligatorio y debe ser string (ISO date).');
  }

  return {
    ok: errors.length === 0,
    errors
  };
};
