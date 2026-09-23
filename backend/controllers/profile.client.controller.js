// backend/controllers/profile.client.controller.js

import { fetchClientProfile } from '../services/profile.client.service.js';

/**
 * Obtener perfil de un cliente desde Supabase
 * GET /profile/client/:id
 */
export const getClientProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await fetchClientProfile(id);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.json(result);

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno obteniendo el perfil del cliente',
      error: error.message
    });
  }
};

/**
 * Crear un cliente
 * POST /profile/client
 */
export const createClientProfile = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const { data, error } = await supabase
      .from('clients')
      .insert([{ name, email, phone }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        ok: false,
        message: 'Error creando cliente',
        error: error.message
      });
    }

    return res.json({
      ok: true,
      client: data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno creando cliente',
      error: error.message
    });
  }
};

/**
 * Actualizar un cliente
 * PUT /profile/client/:id
 */
export const updateClientProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const { data, error } = await supabase
      .from('clients')
      .update({ name, email, phone })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        ok: false,
        message: 'Error actualizando cliente',
        error: error.message
      });
    }

    return res.json({
      ok: true,
      client: data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno actualizando cliente',
      error: error.message
    });
  }
};

/**
 * Eliminar un cliente
 * DELETE /profile/client/:id
 */
export const deleteClientProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({
        ok: false,
        message: 'Error eliminando cliente',
        error: error.message
      });
    }

    return res.json({
      ok: true,
      message: `Cliente ${id} eliminado correctamente`
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno eliminando cliente',
      error: error.message
    });
  }
};
