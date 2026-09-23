// frontend/assets/payments.js

/**
 * ============================================
 *   UI DE PAGOS (CLIENTE → GUY)
 * ============================================
 */

const paymentForm = document.getElementById('paymentForm');
const paymentResult = document.getElementById('paymentResult');
const paymentList = document.getElementById('paymentList');

/**
 * Renderizar resultado en pantalla
 */
const renderResult = (message, type = 'success') => {
  paymentResult.innerHTML = `
    <div class="alert alert-${type}">
      ${message}
    </div>
  `;
};

/**
 * Renderizar lista de pagos
 */
const renderPayments = (payments) => {
  paymentList.innerHTML = '';

  payments.forEach((p) => {
    const item = document.createElement('li');
    item.className = 'list-group-item';

    item.innerHTML = `
      <strong>ID:</strong> ${p.id}<br>
      <strong>Cliente:</strong> ${p.clientId}<br>
      <strong>Guy:</strong> ${p.guyId}<br>
      <strong>Monto:</strong> $${p.amount}<br>
      <strong>Método:</strong> ${p.method}<br>
      <strong>Estado:</strong> ${p.status}<br>
      <strong>Fecha:</strong> ${p.createdAt}
    `;

    paymentList.appendChild(item);
  });
};

/**
 * ============================================
 *   REGISTRAR PAGO
 * ============================================
 */
paymentForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    clientId: document.getElementById('clientId').value,
    guyId: document.getElementById('guyId').value,
    amount: Number(document.getElementById('amount').value),
    method: document.getElementById('method').value,
    description: document.getElementById('description').value
  };

  try {
    const res = await fetch('/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!data.ok) {
      renderResult(data.message || 'Error al registrar pago', 'danger');
      return;
    }

    renderResult('Pago registrado correctamente');
    paymentForm.reset();

  } catch (err) {
    renderResult('Error interno al registrar pago', 'danger');
  }
});

/**
 * ============================================
 *   OBTENER PAGOS POR CLIENTE
 * ============================================
 */
document.getElementById('getClientPayments').addEventListener('click', async () => {
  const clientId = document.getElementById('clientIdQuery').value;

  try {
    const res = await fetch(`/payments/client/${clientId}`);
    const data = await res.json();

    if (!data.ok) {
      renderResult(data.message || 'No se encontraron pagos del cliente', 'danger');
      return;
    }

    renderPayments(data.data);

  } catch (err) {
    renderResult('Error interno al obtener pagos del cliente', 'danger');
  }
});

/**
 * ============================================
 *   OBTENER PAGOS POR GUY
 * ============================================
 */
document.getElementById('getGuyPayments').addEventListener('click', async () => {
  const guyId = document.getElementById('guyIdQuery').value;

  try {
    const res = await fetch(`/payments/guy/${guyId}`);
    const data = await res.json();

    if (!data.ok) {
      renderResult(data.message || 'No se encontraron pagos del Guy', 'danger');
      return;
    }

    renderPayments(data.data);

  } catch (err) {
    renderResult('Error interno al obtener pagos del Guy', 'danger');
  }
});
