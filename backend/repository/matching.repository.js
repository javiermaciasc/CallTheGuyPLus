// backend/repository/matching.repository.js

import { LanguageMatch, DistanceMatch, SpecialtyMatch, FullMatch } from '../models/matching.model.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Base temporal en memoria (simulación de BD)
 */
const languageMatchesDB = [];
const distanceMatchesDB = [];
const specialtyMatchesDB = [];
const fullMatchesDB = [];

/**
 * ============================================
 *   REPOSITORIO: MATCHING POR IDIOMA
 * ============================================
 */
export const matchingLanguageRepository = {
  create(payload) {
    const match = new LanguageMatch({
      id: uuidv4(),
      clientId: payload.clientId,
      guyId: payload.guyId,
      clientLanguage: payload.clientLanguage,
      guyLanguage: payload.guyLanguage,
      score: payload.score,
      createdAt: new Date().toISOString()
    });

    languageMatchesDB.push(match);
    return match;
  },

  findByClient(clientId) {
    return languageMatchesDB.filter((m) => m.clientId === clientId);
  },

  getAll() {
    return languageMatchesDB;
  }
};

/**
 * ============================================
 *   REPOSITORIO: MATCHING POR DISTANCIA
 * ============================================
 */
export const matchingDistanceRepository = {
  create(payload) {
    const match = new DistanceMatch({
      id: uuidv4(),
      clientId: payload.clientId,
      guyId: payload.guyId,
      clientLocation: payload.clientLocation,
      guyLocation: payload.guyLocation,
      distanceKm: payload.distanceKm,
      score: payload.score,
      createdAt: new Date().toISOString()
    });

    distanceMatchesDB.push(match);
    return match;
  },

  findByClient(clientId) {
    return distanceMatchesDB.filter((m) => m.clientId === clientId);
  },

  getAll() {
    return distanceMatchesDB;
  }
};

/**
 * ============================================
 *   REPOSITORIO: MATCHING POR ESPECIALIDAD
 * ============================================
 */
export const matchingSpecialtyRepository = {
  create(payload) {
    const match = new SpecialtyMatch({
      id: uuidv4(),
      clientId: payload.clientId,
      guyId: payload.guyId,
      clientNeed: payload.clientNeed,
      guySpecialty: payload.guySpecialty,
      score: payload.score,
      createdAt: new Date().toISOString()
    });

    specialtyMatchesDB.push(match);
    return match;
  },

  findByClient(clientId) {
    return specialtyMatchesDB.filter((m) => m.clientId === clientId);
  },

  getAll() {
    return specialtyMatchesDB;
  }
};

/**
 * ============================================
 *   REPOSITORIO: MATCHING COMPLETO
 *   (IDIOMA + DISTANCIA + ESPECIALIDAD)
 * ============================================
 */
export const fullMatchingRepository = {
  create(payload) {
    const match = new FullMatch({
      id: uuidv4(),
      clientId: payload.clientId,
      guyId: payload.guyId,
      languageScore: payload.languageScore,
      distanceScore: payload.distanceScore,
      specialtyScore: payload.specialtyScore,
      finalScore: payload.finalScore,
      createdAt: new Date().toISOString()
    });

    fullMatchesDB.push(match);
    return match;
  },

  findByClient(clientId) {
    return fullMatchesDB.filter((m) => m.clientId === clientId);
  },

  getAll() {
    return fullMatchesDB;
  }
};
