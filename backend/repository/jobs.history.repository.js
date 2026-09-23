// backend/repository/jobs.history.repository.js

/**
 * ============================================================
 *   REPOSITORIO: HISTORIAL DE TRABAJO PERMANENTE
 *   SECCIÓN 12 — Trabajo permanente (NO se borra jamás)
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import db from '../database/connection.js';

/**
 * ============================================================
 *   GUARDAR ENTRADA DE HISTORIAL
 * ============================================================
 */
export const saveHistoryEntry = async (historyData) => {
  try {
    const query = `
      INSERT INTO jobs_history (
        historyId,
        jobId,
        clientId,
        guyId,
        status,
        notes,
        createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      historyData.historyId,
      historyData.jobId,
      historyData.clientId,
      historyData.guyId,
      historyData.status,
      historyData.notes,
      historyData.createdAt
    ];

    const [result] = await db.execute(query, params);

    return result.insertId ? historyData : null;

  } catch (error) {
    throw new Error('Error al guardar historial: ' + error.message);
  }
};

/**
 * ============================================================
 *   OBTENER HISTORIAL POR CLIENTE
 * ============================================================
 */
export const findHistoryByClient = async (clientId) => {
  try {
    const query = `
      SELECT *
      FROM jobs_history
      WHERE clientId = ?
      ORDER BY createdAt DESC
    `;

    const [rows] = await db.execute(query, [clientId]);

    return rows;

  } catch (error) {
    throw new Error('Error al obtener historial por cliente: ' + error.message);
  }
};

/**
 * ============================================================
 *   OBTENER HISTORIAL POR GUY
 * ============================================================
 */
export const findHistoryByGuy = async (guyId) => {
  try {
    const query = `
      SELECT *
      FROM jobs_history
      WHERE guyId = ?
      ORDER BY createdAt DESC
    `;

    const [rows] = await db.execute(query, [guyId]);

    return rows;

  } catch (error) {
    throw new Error('Error al obtener historial por Guy: ' + error.message);
  }
};

/**
 * ============================================================
 *   OBTENER HISTORIAL POR JOB
 * ============================================================
 */
export const findHistoryByJob = async (jobId) => {
  try {
    const query = `
      SELECT *
      FROM jobs_history
      WHERE jobId = ?
      ORDER BY createdAt DESC
    `;

    const [rows] = await db.execute(query, [jobId]);

    return rows;

  } catch (error) {
    throw new Error('Error al obtener historial por Job: ' + error.message);
  }
};

/**
 * ============================================================
 *   OBTENER TODAS LAS ENTRADAS DE HISTORIAL
 * ============================================================
 */
export const findAllHistory = async () => {
  try {
    const query = `
      SELECT *
      FROM jobs_history
      ORDER BY createdAt DESC
    `;

    const [rows] = await db.execute(query);

    return rows;

  } catch (error) {
    throw new Error('Error al obtener todo el historial: ' + error.message);
  }
};
