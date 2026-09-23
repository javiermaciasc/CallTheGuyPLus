// backend/repository/jobs.progress.repository.js

/**
 * ============================================
 *   REPOSITORIO: PROGRESO DEL TRABAJO (GUY)
 *   SECCIÓN 6 — Guy realiza el trabajo
 * ============================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 *
 * Este repositorio maneja TODAS las operaciones
 * de lectura y escritura en la base de datos
 * relacionadas con el progreso del trabajo.
 */

import db from '../database/connection.js';

/**
 * ============================================
 *   CREAR REGISTRO DE INICIO DEL TRABAJO
 * ============================================
 */
export const createJobProgressStart = async (data) => {
  try {
    const query = `
      INSERT INTO job_progress (
        jobId,
        guyId,
        clientId,
        progress,
        status,
        note,
        startedAt,
        updatedAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      data.jobId,
      data.guyId,
      data.clientId,
      data.progress,
      data.status,
      data.note,
      data.startedAt,
      data.updatedAt
    ];

    const [result] = await db.execute(query, params);

    return {
      id: result.insertId,
      ...data
    };
  } catch (error) {
    console.error('Error en createJobProgressStart:', error);
    return null;
  }
};

/**
 * ============================================
 *   ACTUALIZAR REGISTRO DE PROGRESO
 * ============================================
 */
export const updateJobProgressEntry = async (data) => {
  try {
    const query = `
      UPDATE job_progress
      SET
        progress = ?,
        status = ?,
        note = ?,
        updatedAt = ?
      WHERE jobId = ? AND guyId = ?
    `;

    const params = [
      data.progress,
      data.status,
      data.note,
      data.updatedAt,
      data.jobId,
      data.guyId
    ];

    const [result] = await db.execute(query, params);

    if (result.affectedRows === 0) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error en updateJobProgressEntry:', error);
    return null;
  }
};

/**
 * ============================================
 *   OBTENER PROGRESO POR JOB
 * ============================================
 */
export const findJobProgressByJob = async (jobId) => {
  try {
    const query = `
      SELECT *
      FROM job_progress
      WHERE jobId = ?
      ORDER BY updatedAt DESC
    `;

    const [rows] = await db.execute(query, [jobId]);

    return rows;
  } catch (error) {
    console.error('Error en findJobProgressByJob:', error);
    return null;
  }
};

/**
 * ============================================
 *   OBTENER PROGRESO POR GUY
 * ============================================
 */
export const findJobProgressByGuy = async (guyId) => {
  try {
    const query = `
      SELECT *
      FROM job_progress
      WHERE guyId = ?
      ORDER BY updatedAt DESC
    `;

    const [rows] = await db.execute(query, [guyId]);

    return rows;
  } catch (error) {
    console.error('Error en findJobProgressByGuy:', error);
    return null;
  }
};
