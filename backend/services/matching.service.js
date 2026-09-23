// backend/services/matching.service.js

import { supabase } from '../supabaseClient.js';
import {
  matchingLanguageRepository,
  matchingDistanceRepository,
  matchingSpecialtyRepository,
  fullMatchingRepository
} from '../repository/matching.repository.js';

/**
 * ============================================
 *   OBTENER PERFIL DEL CLIENTE DESDE SUPABASE
 * ============================================
 */
const getClientProfile = async (clientId) => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', clientId)
    .single();

  if (error) {
    throw new Error('No se pudo obtener el perfil del cliente');
  }

  return data;
};

/**
 * ============================================
 *   OBTENER TODOS LOS GUYS DESDE SUPABASE
 * ============================================
 */
const getAllGuys = async () => {
  const { data, error } = await supabase
    .from('guys')
    .select('*');

  if (error) {
    throw new Error('No se pudieron obtener los Guys');
  }

  return data;
};

/**
 * ============================================
 *   CALCULAR DISTANCIA ENTRE CLIENTE Y GUY
 * ============================================
 */
const calculateDistanceKm = (loc1, loc2) => {
  const R = 6371; // km
  const dLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
  const dLon = (loc2.lon - loc1.lon) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(loc1.lat * (Math.PI / 180)) *
      Math.cos(loc2.lat * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

/**
 * ============================================
 *   SERVICIO: MATCHING POR IDIOMA
 * ============================================
 */
export const matchByLanguageService = async (clientId) => {
  try {
    const client = await getClientProfile(clientId);
    const guys = await getAllGuys();

    const matches = [];

    for (const guy of guys) {
      const score = guy.language === client.language ? 100 : 0;

      const match = matchingLanguageRepository.create({
        clientId,
        guyId: guy.id,
        clientLanguage: client.language,
        guyLanguage: guy.language,
        score
      });

      matches.push(match);
    }

    return {
      ok: true,
      message: 'Matching por idioma generado correctamente',
      data: matches
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error interno en matching por idioma',
      error: error.message
    };
  }
};

/**
 * ============================================
 *   SERVICIO: MATCHING POR DISTANCIA
 * ============================================
 */
export const matchByDistanceService = async (clientId) => {
  try {
    const client = await getClientProfile(clientId);
    const guys = await getAllGuys();

    const matches = [];

    for (const guy of guys) {
      const distanceKm = calculateDistanceKm(client.location, guy.location);

      const score =
        distanceKm <= 2 ? 100 :
        distanceKm <= 5 ? 70 :
        distanceKm <= 10 ? 40 :
        10;

      const match = matchingDistanceRepository.create({
        clientId,
        guyId: guy.id,
        clientLocation: client.location,
        guyLocation: guy.location,
        distanceKm,
        score
      });

      matches.push(match);
    }

    return {
      ok: true,
      message: 'Matching por distancia generado correctamente',
      data: matches
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error interno en matching por distancia',
      error: error.message
    };
  }
};

/**
 * ============================================
 *   SERVICIO: MATCHING POR ESPECIALIDAD
 * ============================================
 */
export const matchBySpecialtyService = async (clientId) => {
  try {
    const client = await getClientProfile(clientId);
    const guys = await getAllGuys();

    const matches = [];

    for (const guy of guys) {
      const score = guy.specialty === client.need ? 100 : 0;

      const match = matchingSpecialtyRepository.create({
        clientId,
        guyId: guy.id,
        clientNeed: client.need,
        guySpecialty: guy.specialty,
        score
      });

      matches.push(match);
    }

    return {
      ok: true,
      message: 'Matching por especialidad generado correctamente',
      data: matches
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error interno en matching por especialidad',
      error: error.message
    };
  }
};

/**
 * ============================================
 *   SERVICIO: MATCHING COMPLETO
 * ============================================
 */
export const fullMatchingService = async (clientId) => {
  try {
    const language = await matchByLanguageService(clientId);
    const distance = await matchByDistanceService(clientId);
    const specialty = await matchBySpecialtyService(clientId);

    const finalMatches = [];

    for (let i = 0; i < language.data.length; i++) {
      const finalScore =
        language.data[i].score +
        distance.data[i].score +
        specialty.data[i].score;

      const fullMatch = fullMatchingRepository.create({
        clientId,
        guyId: language.data[i].guyId,
        languageScore: language.data[i].score,
        distanceScore: distance.data[i].score,
        specialtyScore: specialty.data[i].score,
        finalScore
      });

      finalMatches.push(fullMatch);
    }

    return {
      ok: true,
      message: 'Matching completo generado correctamente',
      data: finalMatches
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error interno generando matching completo',
      error: error.message
    };
  }
};
