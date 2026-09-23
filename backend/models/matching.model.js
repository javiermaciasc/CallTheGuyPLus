// backend/models/matching.model.js

/**
 * ============================================
 *   MODELO: MATCHING POR IDIOMA
 *   SECCIÓN nueva 2 — Matching
 * ============================================
 */

export class LanguageMatch {
  constructor({
    id,
    clientId,
    guyId,
    clientLanguage,
    guyLanguage,
    score,
    createdAt = new Date().toISOString()
  }) {
    this.id = id;
    this.clientId = clientId;
    this.guyId = guyId;
    this.clientLanguage = clientLanguage;
    this.guyLanguage = guyLanguage;
    this.score = score;
    this.createdAt = createdAt;
  }
}

/**
 * ============================================
 *   MODELO: MATCHING POR DISTANCIA
 *   SECCIÓN nueva 2 — Matching
 * ============================================
 */

export class DistanceMatch {
  constructor({
    id,
    clientId,
    guyId,
    clientLocation,
    guyLocation,
    distanceKm,
    score,
    createdAt = new Date().toISOString()
  }) {
    this.id = id;
    this.clientId = clientId;
    this.guyId = guyId;
    this.clientLocation = clientLocation;
    this.guyLocation = guyLocation;
    this.distanceKm = distanceKm;
    this.score = score;
    this.createdAt = createdAt;
  }
}

/**
 * ============================================
 *   MODELO: MATCHING POR ESPECIALIDAD
 *   SECCIÓN nueva 2 — Matching
 * ============================================
 */

export class SpecialtyMatch {
  constructor({
    id,
    clientId,
    guyId,
    clientNeed,
    guySpecialty,
    score,
    createdAt = new Date().toISOString()
  }) {
    this.id = id;
    this.clientId = clientId;
    this.guyId = guyId;
    this.clientNeed = clientNeed;
    this.guySpecialty = guySpecialty;
    this.score = score;
    this.createdAt = createdAt;
  }
}

/**
 * ============================================
 *   MODELO: MATCHING COMPLETO (IDIOMA + DISTANCIA + ESPECIALIDAD)
 *   SECCIÓN nueva 2 — Matching
 * ============================================
 */

export class FullMatch {
  constructor({
    id,
    clientId,
    guyId,
    languageScore,
    distanceScore,
    specialtyScore,
    finalScore,
    createdAt = new Date().toISOString()
  }) {
    this.id = id;
    this.clientId = clientId;
    this.guyId = guyId;
    this.languageScore = languageScore;
    this.distanceScore = distanceScore;
    this.specialtyScore = specialtyScore;
    this.finalScore = finalScore;
    this.createdAt = createdAt;
  }
}
