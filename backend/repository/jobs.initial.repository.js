// backend/repository/jobs.initial.repository.js

import { JobInitialPhoto, JobInitialNotes } from '../models/jobs.initial.model.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * ============================================
 *   BASES DE DATOS EN MEMORIA (SIMULACIÓN)
 * ============================================
 */
const initialPhotosDB = [];
const initialNotesDB = [];

/**
 * ============================================
 *   REPOSITORIO: FOTOS INICIALES DEL CLIENTE
 * ============================================
 */
export const jobsInitialPhotosRepository = {
  create: (jobId, fileData) => {
    const photo = new JobInitialPhoto({
      id: uuidv4(),
      jobId,
      url: fileData.url,
      filename: fileData.filename
    });

    initialPhotosDB.push(photo);
    return photo;
  },

  findByJobId: (jobId) => {
    return initialPhotosDB.filter((p) => p.jobId === jobId);
  },

  deleteById: (id) => {
    const index = initialPhotosDB.findIndex((p) => p.id === id);
    if (index === -1) return null;

    return initialPhotosDB.splice(index, 1)[0];
  },

  list: () => initialPhotosDB
};

/**
 * ============================================
 *   REPOSITORIO: NOTAS INICIALES DEL CLIENTE
 * ============================================
 */
export const jobsInitialNotesRepository = {
  create: (jobId, notes) => {
    const entry = new JobInitialNotes({
      id: uuidv4(),
      jobId,
      notes
    });

    initialNotesDB.push(entry);
    return entry;
  },

  findByJobId: (jobId) => {
    return initialNotesDB.find((n) => n.jobId === jobId) || null;
  },

  update: (jobId, notes) => {
    const index = initialNotesDB.findIndex((n) => n.jobId === jobId);
    if (index === -1) return null;

    initialNotesDB[index].notes = notes;
    initialNotesDB[index].updatedAt = new Date().toISOString();

    return initialNotesDB[index];
  },

  deleteByJobId: (jobId) => {
    const index = initialNotesDB.findIndex((n) => n.jobId === jobId);
    if (index === -1) return null;

    return initialNotesDB.splice(index, 1)[0];
  },

  list: () => initialNotesDB
};
