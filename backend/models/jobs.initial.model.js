// backend/models/jobs.initial.model.js

/**
 * ============================================
 *   MODELO: FOTOS INICIALES DEL CLIENTE
 * ============================================
 */
export class JobInitialPhoto {
  constructor({
    id,
    jobId,
    url,
    filename,
    uploadedAt = new Date().toISOString()
  }) {
    this.id = id;
    this.jobId = jobId;
    this.url = url;
    this.filename = filename;
    this.uploadedAt = uploadedAt;
  }
}

/**
 * ============================================
 *   MODELO: NOTAS INICIALES DEL CLIENTE
 * ============================================
 */
export class JobInitialNotes {
  constructor({
    id,
    jobId,
    notes,
    createdAt = new Date().toISOString(),
    updatedAt = null
  }) {
    this.id = id;
    this.jobId = jobId;
    this.notes = notes;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
