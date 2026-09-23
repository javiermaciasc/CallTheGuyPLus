const supabase = require('../../config/db.js');
const generateId = require('../../utils/idgenerator.js');

// Obtener todas las órdenes
async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*');

  if (error) throw error;
  return data || [];
}

// Crear orden de compra (y factura con el mismo número)
async function createOrder(data) {
  const id = await generateId('orders');

  // Orden
  const newOrder = {
    id,
    ...data,
    status: 'pending',
    invoiceReleased: false,
    createdAt: new Date().toISOString()
  };

  const { error: orderErr } = await supabase
    .from('orders')
    .insert(newOrder);

  if (orderErr) throw orderErr;

  // Factura con el MISMO número
  const invoice = {
    id,
    orderId: id,
    clientId: data.clientId,
    amount: data.amount,
    released: false,
    createdAt: new Date().toISOString()
  };

  const { error: invoiceErr } = await supabase
    .from('invoices')
    .insert(invoice);

  if (invoiceErr) throw invoiceErr;

  return { order: newOrder, invoice };
}

// Obtener orden por ID
async function getOrderById(id) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

// Actualizar orden
async function updateOrder(id, data) {
  const updated = {
    ...data,
    updatedAt: new Date().toISOString()
  };

  const { data: result, error } = await supabase
    .from('orders')
    .update(updated)
    .eq('id', id)
    .select()
    .single();

  if (error) return null;
  return result;
}

// Confirmación de pago por parte del Guy → libera factura
async function confirmPayment(id) {
  // Actualizar orden
  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .update({
      status: 'paid',
      invoiceReleased: true,
      updatedAt: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (orderErr || !order) return null;

  // Actualizar factura
  const { data: invoice, error: invoiceErr } = await supabase
    .from('invoices')
    .update({
      released: true,
      updatedAt: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (invoiceErr) return { order, invoice: null };

  return { order, invoice };
}

// Eliminar orden + factura asociada
async function deleteOrder(id) {
  const { error: orderErr } = await supabase
    .from('orders')
    .delete()
    .eq('id', id);

  const { error: invoiceErr } = await supabase
    .from('invoices')
    .delete()
    .eq('id', id);

  if (orderErr || invoiceErr) throw (orderErr || invoiceErr);
  return true;
}

module.exports = {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  confirmPayment,
  deleteOrder
};
