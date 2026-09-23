// backend/controllers/profile.guy.controller.js

import { supabase } from '../supabaseClient.js';
import { fetchGuyProfile } from '../services/profile.guy.service.js';

/**
 * Obtener perfil de un Guy desde Supabase
 * GET /profile/guy/:id
 */
export const getGuyProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await fetchGuyProfile(id);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.json(result);

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno obteniendo el perfil del Guy',
      error: error.message
    });
  }
};

/**
 * Crear un Guy
 * POST /profile/guy
 */
export const createGuyProfile = async (req, res) => {
  const { name, phone, skills, rating } = req.body;

  try {
    const { data, error } = await supabase
      .from('guys')
      .insert([{ name, phone, skills, rating }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        ok: false,
        message: 'Error creando Guy',
        error: error.message
      });
    }

    return res.json({
      ok: true,
      guy: data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno creando Guy',
      error: error.message
    });
  }
};

/**
 * Actualizar un Guy
 * PUT /profile/guy/:id
 */
export const updateGuyProfile = async (req, res) => {
  const { id } = req.params;
  const { name, phone, skills, rating } = req.body;

  try {
    const { data, error } = await supabase
      .from('guys')
      .update({ name, phone, skills, rating })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        ok: false,
        message: 'Error actualizando Guy',
        error: error.message
      });
    }

    return res.json({
      ok: true,
      guy: data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno actualizando Guy',
      error: error.message
    });
  }
};

/**
 * Eliminar un Guy
 * DELETE /profile/guy/:id
 */
export const deleteGuyProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('guys')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({
        ok: false,
        message: 'Error eliminando Guy',
        error: error.message
      });
    }

    return res.json({
      ok: true,
      message: `Guy ${id} eliminado correctamente`
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno eliminando Guy',
      error: error.message
    });
  }
};
