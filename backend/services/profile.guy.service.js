// backend/services/profile.guy.service.js

import { supabase } from '../supabaseClient.js';
import ProfileGuy from '../models/profile.guy.model.js';

/**
 * Obtener perfil de un Guy desde Supabase
 */
export const fetchGuyProfile = async (guy_id) => {
  try {
    const { data, error } = await supabase
      .from('guys')
      .select('*')
      .eq('id', guy_id)
      .single();

    if (error) {
      return {
        ok: false,
        message: 'Error obteniendo perfil del Guy',
        error: error.message
      };
    }

    const guy = ProfileGuy.fromSupabase(data);

    return {
      ok: true,
      guy: guy.toJSON()
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno obteniendo perfil del Guy',
      error: err.message
    };
  }
};

/**
 * Crear Guy
 */
export const createGuy = async ({ name, phone, skills, rating }) => {
  try {
    const { data, error } = await supabase
      .from('guys')
      .insert([{ name, phone, skills, rating }])
      .select()
      .single();

    if (error) {
      return {
        ok: false,
        message: 'Error creando Guy',
        error: error.message
      };
    }

    const guy = ProfileGuy.fromSupabase(data);

    return {
      ok: true,
      guy: guy.toJSON()
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno creando Guy',
      error: err.message
    };
  }
};

/**
 * Actualizar Guy
 */
export const updateGuy = async (guy_id, { name, phone, skills, rating }) => {
  try {
    const { data, error } = await supabase
      .from('guys')
      .update({ name, phone, skills, rating })
      .eq('id', guy_id)
      .select()
      .single();

    if (error) {
      return {
        ok: false,
        message: 'Error actualizando Guy',
        error: error.message
      };
    }

    const guy = ProfileGuy.fromSupabase(data);

    return {
      ok: true,
      guy: guy.toJSON()
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno actualizando Guy',
      error: err.message
    };
  }
};

/**
 * Eliminar Guy
 */
export const deleteGuy = async (guy_id) => {
  try {
    const { error } = await supabase
      .from('guys')
      .delete()
      .eq('id', guy_id);

    if (error) {
      return {
        ok: false,
        message: 'Error eliminando Guy',
        error: error.message
      };
    }

    return {
      ok: true,
      message: `Guy ${guy_id} eliminado correctamente`
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno eliminando Guy',
      error: err.message
    };
  }
};
