const supabase = require('../../config/db.js');
const generateId = require('../../utils/idgenerator.js');

// Obtener todas las tiendas
async function getStores() {
  const { data, error } = await supabase
    .from('stores')
    .select('*');

  if (error) throw error;
  return data || [];
}

// Crear tienda nueva con ID consecutivo
async function createStore(data) {
  const id = await generateId('stores');

  const newStore = {
    id,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: null
  };

  const { error } = await supabase
    .from('stores')
    .insert(newStore);

  if (error) throw error;
  return newStore;
}

// Obtener tienda por ID
async function getStoreById(id) {
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

// Actualizar tienda
async function updateStore(id, data) {
  const updated = {
    ...data,
    updatedAt: new Date().toISOString()
  };

  const { data: result, error } = await supabase
    .from('stores')
    .update(updated)
    .eq('id', id)
    .select()
    .single();

  if (error) return null;
  return result;
}

// Eliminar tienda
async function deleteStore(id) {
  const { error } = await supabase
    .from('stores')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

module.exports = {
  getStores,
  createStore,
  getStoreById,
  updateStore,
  deleteStore
};

