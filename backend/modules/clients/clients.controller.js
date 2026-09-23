const supabase = require('../../config/db.js');
const generateId = require('../../utils/idgenerator.js');

// Obtener todos los clientes
async function getClients() {
  const { data, error } = await supabase
    .from('clients')
    .select('*');

  if (error) throw error;
  return data || [];
}

// Crear cliente nuevo con ID consecutivo
async function createClient(data) {
  const id = await generateId('clients');

  const newClient = {
    id,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: null
  };

  const { error } = await supabase
    .from('clients')
    .insert(newClient);

  if (error) throw error;
  return newClient;
}

// Obtener cliente por ID
async function getClientById(id) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

// Actualizar cliente
async function updateClient(id, data) {
  const updated = {
    ...data,
    updatedAt: new Date().toISOString()
  };

  const { data: result, error } = await supabase
    .from('clients')
    .update(updated)
    .eq('id', id)
    .select()
    .single();

  if (error) return null;
  return result;
}

// Eliminar cliente
async function deleteClient(id) {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

module.exports = {
  getClients,
  createClient,
  getClientById,
  updateClient,
  deleteClient
};
