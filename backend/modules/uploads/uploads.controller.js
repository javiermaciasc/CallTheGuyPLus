const supabase = require('../../config/db.js');
const generateId = require('../../utils/idgenerator.js');

// Obtener todos los uploads
async function getUploads() {
  const { data, error } = await supabase
    .from('uploads')
    .select('*');

  if (error) throw error;
  return data || [];
}

// Crear upload nuevo
async function createUpload(data) {
  const id = await generateId('uploads');

  const newUpload = {
    id,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: null
  };

  const { error } = await supabase
    .from('uploads')
    .insert(newUpload);

  if (error) throw error;
  return newUpload;
}

// Obtener upload por ID
async function getUploadById(id) {
  const { data, error } = await supabase
    .from('uploads')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

// Actualizar upload
async function updateUpload(id, data) {
  const updated = {
    ...data,
    updatedAt: new Date().toISOString()
  };

  const { data: result, error } = await supabase
    .from('uploads')
    .update(updated)
    .eq('id', id)
    .select()
    .single();

  if (error) return null;
  return result;
}

// Eliminar upload
async function deleteUpload(id) {
  const { error } = await supabase
    .from('uploads')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

module.exports = {
  getUploads,
  createUpload,
  getUploadById,
  updateUpload,
  deleteUpload
};
