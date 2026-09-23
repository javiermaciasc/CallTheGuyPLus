const supabase = require('../../config/db.js');
const generateId = require('../../utils/idgenerator.js');

// Obtener todos los pagos
async function getPayments() {
  const { data, error } = await supabase
    .from('payments')
    .select('*');

  if (error) throw error;
  return data || [];
}

// Registrar pago → libera factura y marca orden como pagada
async function createPayment(data) {
  const paymentId = await generateId('payments');

  const payment = {
    id: paymentId,
    orderId: data.orderId,
    clientId: data.clientId,
    guyId: data.guyId,
    amount: data.amount,
    method: data.method || 'unknown',
    createdAt: new Date().toISOString()
  };

  // Insertar pago
  const { error: payErr } = await supabase
    .from('payments')
    .insert(payment);

  if (payErr) throw payErr;

  // Actualizar orden
  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .update({
      status: 'paid',
      invoiceReleased: true,
      updatedAt: new Date().toISOString()
    })
    .eq('id', data.orderId)
    .select()
    .single();

  if (orderErr) throw orderErr;

  // Liberar factura
  const { data: invoice, error: invErr } = await supabase
    .from('invoices')
    .update({
      released: true,
      updatedAt: new Date().toISOString()
    })
    .eq('id', data.orderId)
    .select()
    .single();

  if (invErr) throw invErr;

  return { payment, order, invoice };
}

// Obtener pago por ID
async function getPaymentById(id) {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

// Eliminar pago
async function deletePayment(id) {
  const { error } = await supabase
    .from('payments')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

module.exports = {
  getPayments,
  createPayment,
  getPaymentById,
  deletePayment
};
