// backend/repository/disputes.repository.js

/**
 * ============================================
 *   REPOSITORIO: DISPUTAS
 *   SECCIÓN 8 — Cliente abre disputa / Guy responde
 * ============================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import db from '../database/connection.js';

/**
 * ============================================
 *   CREAR DISPUTA (CLIENTE)
 * ============================================
 */
export const createDispute = async (data) => {
  try {
    const query = `
      INSERT INTO disputes (
        jobId,
        clientId,
        guyId,
        reason,
        description,
        status,
        createdAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      data.jobId,
      data.clientId,
      data.guyId,
      data.reason,
      data.description,
      data.status,
      data.createdAt
    ];

    const [result] = await db.execute(query, params);

    return {
      id: result.insertId,
      ...data
    };
  } catch (error) {
    console.error('Error en createDispute:', error);
    return null;
  }
};

/**
 * ============================================
 *   RESPONDER DISPUTA (GUY)
 * ============================================
 */
export const respondDispute = async (data) => {
  try {
    const query = `
      UPDATE disputes
      SET
        response = ?,
        respondedAt = ?,
        status = ?
      WHERE id = ? AND guyId = ?
    `;

    const params = [
      data.response,
      data.respondedAt,
      data.status,
      data.disputeId,
      data.guyId
    ];

    const [result] = await db.execute(query, params);

    if (result.affectedRows === 0) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error en respondDispute:', error);
    return null;
  }
};

/**
 * ============================================
 *   OBTENER DISPUTA POR JOB
 * ============================================
 */
export const findDisputeByJob = async (jobId) => {
  try {
    const query = `
      SELECT *
      FROM disputes
      WHERE jobId = ?
      ORDER BY createdAt DESC
      LIMIT 1
    `;

    const [rows] = await db.execute(query, [jobId]);

    if (!rows || rows.length === 0) return null;

    return rows[0];
  } catch (error) {
    console.error('Error en findDisputeByJob:', error);
    return null;
  }
};

/**
 * ============================================
 *   OBTENER DISPUTAS POR CLIENTE
 * ============================================
 */
export const findDisputesByClient = async (clientId) => {
  try {
    const query = `
      SELECT *
      FROM disputes
      WHERE clientId = ?
      ORDER BY createdAt DESC
    `;

    const [rows] = await db.execute(query, [clientId]);

    return rows;
  } catch (error) {
    console.error('Error en findDisputesByClient:', error);
    return null;
  }
};

/**
 * ============================================
 *   OBTENER DISPUTAS POR GUY
 * ============================================
 */
export const findDisputesByGuy = async (guyId) => {
  try {
    const query = `
      SELECT *
      FROM disputes
      WHERE guyId = ?
      ORDER BY createdAt DESC
    `;

    const [rows] = await db.execute(query, [guyId]);

    return rows;
  } catch (error) {
    console.error('Error en findDisputesByGuy:', error);
    return null;
  }
};
