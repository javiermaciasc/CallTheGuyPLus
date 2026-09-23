// backend/services/profile.client.service.js

import { supabase } from '../supabaseClient.js';
import ProfileClient from '../models/profile.client.model.js';

/**
 * Obtener perfil de cliente desde Supabase
 */
export const fetchClientProfile = async (client_id) => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', client_id)
      .single();

    if (error) {
      return {
        ok: false,
        message: 'Error obteniendo perfil del cliente',
        error: error.message
      };
    }

    const client = ProfileClient.fromSupabase(data);

    return {
      ok: true,
      client: client.toJSON()
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno obteniendo perfil del cliente',
      error: err.message
    };
  }
};

/**
 * Crear cliente (usado por el controlador)
 */
export const createClient = async ({ name, email, phone }) => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .insert([{ name, email, phone }])
      .select()
      .single();

    if (error) {
      return {
        ok: false,
        message: 'Error creando cliente',
        error: error.message
      };
    }

    const client = ProfileClient.fromSupabase(data);

    return {
      ok: true,
      client: client.toJSON()
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno creando cliente',
      error: err.message
    };
  }
};

/**
 * Actualizar cliente
 */
export const updateClient = async (client_id, { name, email, phone }) => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .update({ name, email, phone })
      .eq('id', client_id)
      .select()
      .single();

    if (error) {
      return {
        ok: false,
        message: 'Error actualizando cliente',
        error: error.message
      };
    }

    const client = ProfileClient.fromSupabase(data);

    return {
      ok: true,
      client: client.toJSON()
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno actualizando cliente',
      error: err.message
    };
  }
};

/**
 * Eliminar cliente
 */
export const deleteClient = async (client_id) => {
  try {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', client_id);

    if (error) {
      return {
        ok: false,
        message: 'Error eliminando cliente',
        error: error.message
      };
    }

    return {
      ok: true,
      message: `Cliente ${client_id} eliminado correctamente`
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error interno eliminando cliente',
      error: err.message
    };
  }
};
