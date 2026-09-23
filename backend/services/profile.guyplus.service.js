// backend/services/profile.guyplus.service.js

import { supabase } from '../supabaseClient.js';
import ProfileGuyPlus from '../models/profile.guyplus.model.js';

/**
 * Obtener perfil de un GuyPlus desde Supabase
 */
export const fetchGuyPlusProfile = async (guyplus_id) => {
  try {
    const { data, error } = await supabase
      .from('guyplus')
      .select('*')
      .eq('id', guyplus_id)
      .single();

    if (error) {
      return {
        ok: false,
        message: 'Error obteniendo perfil del GuyPlus',
        error: error.message
      };
    }

    const guyplus = ProfileGuyPlus.fromSupabase(data);

    return {
      ok: true,
      guyplus: guyplus.toJSON()
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno obteniendo perfil del GuyPlus',
      error: err.message
    };
  }
};

/**
 * Crear GuyPlus
 */
export const createGuyPlus = async ({
  name,
  phone,
  skills,
  rating,
  certifications,
  experience_years
}) => {
  try {
    const { data, error } = await supabase
      .from('guyplus')
      .insert([
        {
          name,
          phone,
          skills,
          rating,
          certifications,
          experience_years
        }
      ])
      .select()
      .single();

    if (error) {
      return {
        ok: false,
        message: 'Error creando GuyPlus',
        error: error.message
      };
    }

    const guyplus = ProfileGuyPlus.fromSupabase(data);

    return {
      ok: true,
      guyplus: guyplus.toJSON()
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno creando GuyPlus',
      error: err.message
    };
  }
};

/**
 * Actualizar GuyPlus
 */
export const updateGuyPlus = async (
  guyplus_id,
  {
    name,
    phone,
    skills,
    rating,
    certifications,
    experience_years
  }
) => {
  try {
    const { data, error } = await supabase
      .from('guyplus')
      .update({
        name,
        phone,
        skills,
        rating,
        certifications,
        experience_years
      })
      .eq('id', guyplus_id)
      .select()
      .single();

    if (error) {
      return {
        ok: false,
        message: 'Error actualizando GuyPlus',
        error: error.message
      };
    }

    const guyplus = ProfileGuyPlus.fromSupabase(data);

    return {
      ok: true,
      guyplus: guyplus.toJSON()
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno actualizando GuyPlus',
      error: err.message
    };
  }
};

/**
 * Eliminar GuyPlus
 */
export const deleteGuyPlus = async (guyplus_id) => {
  try {
    const { error } = await supabase
      .from('guyplus')
      .delete()
      .eq('id', guyplus_id);

    if (error) {
      return {
        ok: false,
        message: 'Error eliminando GuyPlus',
        error: error.message
      };
    }

    return {
      ok: true,
      message: `GuyPlus ${guyplus_id} eliminado correctamente`
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno eliminando GuyPlus',
      error: err.message
    };
  }
};
