// backend/repository/jobs.final.repository.js

/**
 * ============================================
 *   REPOSITORIO: FOTOS FINALES DEL TRABAJO
 *   SECCIÓN 7 — Guy sube fotos finales (OBLIGATORIAS)
 * ============================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import db from '../database/connection.js';

/**
 * ============================================
 *   GUARDAR FOTOS FINALES
 * ============================================
 */
export const saveFinalPhotos = async (data) => {
  try {
    const query = `
      INSERT INTO job_final_photos (
        jobId,
        guyId,
        clientId,
        photos,
        uploadedAt
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    const params = [
      data.jobId,
      data.guyId,
      data.clientId,
      JSON.stringify(data.photos), // almacenar array como JSON
      data.uploadedAt
    ];

    const [result] = await db.execute(query, params);

    return {
      id: result.insertId,
      ...data
    };
  } catch (error) {
    console.error('Error en saveFinalPhotos:', error);
    return null;
  }
};

/**
 * ============================================
 *   OBTENER FOTOS FINALES POR JOB
 * ============================================
 */
export const findFinalPhotosByJob = async (jobId) => {
  try {
    const query = `
      SELECT *
      FROM job_final_photos
      WHERE jobId = ?
      ORDER BY uploadedAt DESC
    `;

    const [rows] = await db.execute(query, [jobId]);

    // convertir JSON a array
    return rows.map((row) => ({
      ...row,
      photos: JSON.parse(row.photos)
    }));
  } catch (error) {
    console.error('Error en findFinalPhotosByJob:', error);
    return null;
  }
};

/**
 * ============================================
 *   OBTENER FOTOS FINALES POR GUY
 * ============================================
 */
export const findFinalPhotosByGuy = async (guyId) => {
  try {
    const query = `
      SELECT *
      FROM job_final_photos
      WHERE guyId = ?
      ORDER BY uploadedAt DESC
    `;

    const [rows] = await db.execute(query, [guyId]);

    // convertir JSON a array
    return rows.map((row) => ({
      ...row,
      photos: JSON.parse(row.photos)
    }));
  } catch (error) {
    console.error('Error en findFinalPhotosByGuy:', error);
    return null;
  }
};
