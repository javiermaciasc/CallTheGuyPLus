// backend/repository/ratings.repository.js

/**
 * ============================================================
 *   REPOSITORIO: RATINGS
 *   SECCIÓN 9 — Calificación del cliente hacia el Guy
 *   SECCIÓN 10 — Calificación del Guy hacia el cliente
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

import db from '../database/connection.js';

/**
 * ============================================================
 *   GUARDAR RATING (CLIENTE → GUY o GUY → CLIENTE)
 * ============================================================
 */
export const saveRating = async (data) => {
  try {
    const query = `
      INSERT INTO ratings (
        raterId,
        raterType,
        rateeId,
        rateeType,
        jobId,
        stars,
        comment,
        evidencePdf,
        createdAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      data.raterId,
      data.raterType,
      data.rateeId,
      data.rateeType,
      data.jobId,
      data.stars,
      data.comment,
      data.evidencePdf,
      data.createdAt
    ];

    const [result] = await db.execute(query, params);

    return {
      id: result.insertId,
      ...data
    };
  } catch (error) {
    console.error('Error en saveRating:', error);
    return null;
  }
};

/**
 * ============================================================
 *   OBTENER RATINGS RECIBIDOS POR UN GUY
 *   (CLIENTE → GUY)
 * ============================================================
 */
export const findRatingsForGuy = async (guyId) => {
  try {
    const query = `
      SELECT *
      FROM ratings
      WHERE rateeId = ?
      AND rateeType = 'guy'
      ORDER BY createdAt DESC
    `;

    const [rows] = await db.execute(query, [guyId]);

    return rows;
  } catch (error) {
    console.error('Error en findRatingsForGuy:', error);
    return null;
  }
};

/**
 * ============================================================
 *   OBTENER RATINGS RECIBIDOS POR UN CLIENTE
 *   (GUY → CLIENTE)
 * ============================================================
 */
export const findRatingsForClient = async (clientId) => {
  try {
    const query = `
      SELECT *
      FROM ratings
      WHERE rateeId = ?
      AND rateeType = 'client'
      ORDER BY createdAt DESC
    `;

    const [rows] = await db.execute(query, [clientId]);

    return rows;
  } catch (error) {
    console.error('Error en findRatingsForClient:', error);
    return null;
  }
};

/**
 * ============================================================
 *   OBTENER TODOS LOS RATINGS DE UN TRABAJO
 *   (Ambos sentidos: cliente→guy y guy→cliente)
 * ============================================================
 */
export const findRatingsByJob = async (jobId) => {
  try {
    const query = `
      SELECT *
      FROM ratings
      WHERE jobId = ?
      ORDER BY createdAt DESC
    `;

    const [rows] = await db.execute(query, [jobId]);

    return rows;
  } catch (error) {
    console.error('Error en findRatingsByJob:', error);
    return null;
  }
};

/**
 * ============================================================
 *   OBTENER RATINGS HECHOS POR UN CLIENTE
 *   (CLIENTE → GUY)
 * ============================================================
 */
export const findRatingsMadeByClient = async (clientId) => {
  try {
    const query = `
      SELECT *
      FROM ratings
      WHERE raterId = ?
      AND raterType = 'client'
      ORDER BY createdAt DESC
    `;

    const [rows] = await db.execute(query, [clientId]);

    return rows;
  } catch (error) {
    console.error('Error en findRatingsMadeByClient:', error);
    return null;
  }
};

/**
 * ============================================================
 *   OBTENER RATINGS HECHOS POR UN GUY
 *   (GUY → CLIENTE)
 * ============================================================
 */
export const findRatingsMadeByGuy = async (guyId) => {
  try {
    const query = `
      SELECT *
      FROM ratings
      WHERE raterId = ?
      AND raterType = 'guy'
      ORDER BY createdAt DESC
    `;

    const [rows] = await db.execute(query, [guyId]);

    return rows;
  } catch (error) {
    console.error('Error en findRatingsMadeByGuy:', error);
    return null;
  }
};
