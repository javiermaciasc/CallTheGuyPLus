const supabase = require('../../config/db.js');
const generateId = require('../../utils/idgenerator.js');

// Obtener todos los usuarios
async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) throw error;
  return data || [];
}

// Crear usuario nuevo
async function createUser(data) {
  const id = await generateId('users');

  const newUser = {
    id,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: null
  };

  const { error } = await supabase
    .from('users')
    .insert(newUser);

  if (error) throw error;
  return newUser;
}

// Obtener usuario por ID
async function getUserById(id) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

// Actualizar usuario
async function updateUser(id, data) {
  const updated = {
    ...data,
    updatedAt: new Date().toISOString()
  };

  const { data: result, error } = await supabase
    .from('users')
    .update(updated)
    .eq('id', id)
    .select()
    .single();

  if (error) return null;
  return result;
}

// Eliminar usuario
async function deleteUser(id) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
