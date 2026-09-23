// backend/controllers/profile.guyplus.controller.js

import { supabase } from '../supabaseClient.js';
import { fetchGuyPlusProfile } from '../services/profile.guyplus.service.js';

/**
 * Obtener perfil de un GuyPlus desde Supabase
 * GET /profile/guyplus/:id
 */
export const getGuyPlusProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await fetchGuyPlusProfile(id);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.json(result);

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno obteniendo el perfil del GuyPlus',
      error: error.message
    });
  }
};

/**
 * Crear un GuyPlus
 * POST /profile/guyplus
 */
export const createGuyPlusProfile = async (req, res) => {
  const {
    name,
    phone,
    skills,
    rating,
    certifications,
    experience_years
  } = req.body;

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
      return res.status(400).json({
        ok: false,
        message: 'Error creando GuyPlus',
        error: error.message
      });
    }

    return res.json({
      ok: true,
      guyplus: data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno creando GuyPlus',
      error: error.message
    });
  }
};

/**
 * Actualizar un GuyPlus
 * PUT /profile/guyplus/:id
 */
export const updateGuyPlusProfile = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    phone,
    skills,
    rating,
    certifications,
    experience_years
  } = req.body;

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
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        ok: false,
        message: 'Error actualizando GuyPlus',
        error: error.message
      });
    }

    return res.json({
      ok: true,
      guyplus: data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno actualizando GuyPlus',
      error: error.message
    });
  }
};

/**
 * Eliminar un GuyPlus
 * DELETE /profile/guyplus/:id
 */
export const deleteGuyPlusProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('guyplus')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({
        ok: false,
        message: 'Error eliminando GuyPlus',
        error: error.message
      });
    }

    return res.json({
      ok: true,
      message: `GuyPlus ${id} eliminado correctamente`
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno eliminando GuyPlus',
      error: error.message
    });
  }
};
