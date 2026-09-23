const supabase = require('../../config/db.js');
const generateId = require('../../utils/idgenerator.js');

// Obtener todos los Guys
async function getGuys() {
  const { data, error } = await supabase
    .from('guys')
    .select('*');

  if (error) throw error;
  return data || [];
}

// Crear Guy nuevo con ID consecutivo
async function createGuy(data) {
  const id = await generateId('guys');

  const newGuy = {
    id,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: null
  };

  const { error } = await supabase
    .from('guys')
    .insert(newGuy);

  if (error) throw error;
  return newGuy;
}

// Obtener Guy por ID
async function getGuyById(id) {
  const { data, error } = await supabase
    .from('guys')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

// Actualizar Guy
async function updateGuy(id, data) {
  const updated = {
    ...data,
    updatedAt: new Date().toISOString()
  };

  const { data: result, error } = await supabase
    .from('guys')
    .update(updated)
    .eq('id', id)
    .select()
    .single();

  if (error) return null;
  return result;
}

// Eliminar Guy
async function deleteGuy(id) {
  const { error } = await supabase
    .from('guys')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

module.exports = {
  getGuys,
  createGuy,
  getGuyById,
  updateGuy,
  deleteGuy
};
