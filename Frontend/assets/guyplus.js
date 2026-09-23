// frontend/assets/guyplus.js

/**
 * ============================================
 *   UI — GUY PLUS (VENDORS)
 * ============================================
 *   - Crear Vendor
 *   - Listar Vendors
 *   - Crear Orden
 *   - Listar Órdenes
 *   - Crear Beneficio
 *   - Listar Beneficios
 *   - Registrar Pago a Vendor
 *   - Listar Pagos a Vendor
 * ============================================
 */

/**
 * Helpers UI
 */
const renderMessage = (element, message, type = 'success') => {
  element.innerHTML = `
    <div class="alert alert-${type}">
      ${message}
    </div>
  `;
};

const renderList = (element, items, formatter) => {
  element.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = formatter(item);
    element.appendChild(li);
  });
};

/**
 * ============================================
 *   CREAR VENDOR
 * ============================================
 */
const vendorForm = document.getElementById('vendorForm');
const vendorResult = document.getElementById('vendorResult');

vendorForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    name: document.getElementById('vendorName').value,
    email: document.getElementById('vendorEmail').value,
    phone: document.getElementById('vendorPhone').value
  };

  try {
    const res = await fetch('/guyplus/vendors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!data.ok) {
      renderMessage(vendorResult, data.message, 'danger');
      return;
    }

    renderMessage(vendorResult, 'Vendor creado correctamente');
    vendorForm.reset();

  } catch (err) {
    renderMessage(vendorResult, 'Error interno al crear vendor', 'danger');
  }
});

/**
 * ============================================
 *   LISTAR VENDORS
 * ============================================
 */
const vendorListBtn = document.getElementById('listVendors');
const vendorList = document.getElementById('vendorList');

vendorListBtn?.addEventListener('click', async () => {
  try {
    const res = await fetch('/guyplus/vendors');
    const data = await res.json();

    if (!data.ok) {
      renderMessage(vendorList, data.message, 'danger');
      return;
    }

    renderList(
      vendorList,
      data.data,
      (v) => `
        <strong>ID:</strong> ${v.id}<br>
        <strong>Nombre:</strong> ${v.name}<br>
        <strong>Email:</strong> ${v.email}<br>
        <strong>Teléfono:</strong> ${v.phone}<br>
        <strong>Fecha:</strong> ${v.createdAt}
      `
    );

  } catch (err) {
    renderMessage(vendorList, 'Error interno al listar vendors', 'danger');
  }
});

/**
 * ============================================
 *   CREAR ORDEN DE VENDOR
 * ============================================
 */
const orderForm = document.getElementById('vendorOrderForm');
const orderResult = document.getElementById('vendorOrderResult');

orderForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    vendorId: document.getElementById('orderVendorId').value,
    title: document.getElementById('orderTitle').value,
    description: document.getElementById('orderDescription').value
  };

  try {
    const res = await fetch('/guyplus/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!data.ok) {
      renderMessage(orderResult, data.message, 'danger');
      return;
    }

    renderMessage(orderResult, 'Orden creada correctamente');
    orderForm.reset();

  } catch (err) {
    renderMessage(orderResult, 'Error interno al crear orden', 'danger');
  }
});

/**
 * ============================================
 *   LISTAR ÓRDENES DE VENDORS
 * ============================================
 */
const orderListBtn = document.getElementById('listVendorOrders');
const orderList = document.getElementById('vendorOrderList');

orderListBtn?.addEventListener('click', async () => {
  try {
    const res = await fetch('/guyplus/orders');
    const data = await res.json();

    if (!data.ok) {
      renderMessage(orderList, data.message, 'danger');
      return;
    }

    renderList(
      orderList,
      data.data,
      (o) => `
        <strong>ID:</strong> ${o.id}<br>
        <strong>Vendor:</strong> ${o.vendorId}<br>
        <strong>Título:</strong> ${o.title}<br>
        <strong>Descripción:</strong> ${o.description}<br>
        <strong>Fecha:</strong> ${o.createdAt}
      `
    );

  } catch (err) {
    renderMessage(orderList, 'Error interno al listar órdenes', 'danger');
  }
});

/**
 * ============================================
 *   CREAR BENEFICIO DE VENDOR
 * ============================================
 */
const benefitForm = document.getElementById('vendorBenefitForm');
const benefitResult = document.getElementById('vendorBenefitResult');

benefitForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    vendorId: document.getElementById('benefitVendorId').value,
    title: document.getElementById('benefitTitle').value,
    description: document.getElementById('benefitDescription').value
  };

  try {
    const res = await fetch('/guyplus/benefits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!data.ok) {
      renderMessage(benefitResult, data.message, 'danger');
      return;
    }

    renderMessage(benefitResult, 'Beneficio creado correctamente');
    benefitForm.reset();

  } catch (err) {
    renderMessage(benefitResult, 'Error interno al crear beneficio', 'danger');
  }
});

/**
 * ============================================
 *   LISTAR BENEFICIOS DE VENDORS
 * ============================================
 */
const benefitListBtn = document.getElementById('listVendorBenefits');
const benefitList = document.getElementById('vendorBenefitList');

benefitListBtn?.addEventListener('click', async () => {
  try {
    const res = await fetch('/guyplus/benefits');
    const data = await res.json();

    if (!data.ok) {
      renderMessage(benefitList, data.message, 'danger');
      return;
    }

    renderList(
      benefitList,
      data.data,
      (b) => `
        <strong>ID:</strong> ${b.id}<br>
        <strong>Vendor:</strong> ${b.vendorId}<br>
        <strong>Título:</strong> ${b.title}<br>
        <strong>Descripción:</strong> ${b.description}<br>
        <strong>Activo:</strong> ${b.active}<br>
        <strong>Fecha:</strong> ${b.createdAt}
      `
    );

  } catch (err) {
    renderMessage(benefitList, 'Error interno al listar beneficios', 'danger');
  }
});

/**
 * ============================================
 *   REGISTRAR PAGO A VENDOR
 * ============================================
 */
const vendorPaymentForm = document.getElementById('vendorPaymentForm');
const vendorPaymentResult = document.getElementById('vendorPaymentResult');

vendorPaymentForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    vendorId: document.getElementById('vendorPaymentVendorId').value,
    amount: Number(document.getElementById('vendorPaymentAmount').value),
    method: document.getElementById('vendorPaymentMethod').value,
    description: document.getElementById('vendorPaymentDescription').value
  };

  try {
    const res = await fetch('/guyplus/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!data.ok) {
      renderMessage(vendorPaymentResult, data.message, 'danger');
      return;
    }

    renderMessage(vendorPaymentResult, 'Pago registrado correctamente');
    vendorPaymentForm.reset();

  } catch (err) {
    renderMessage(vendorPaymentResult, 'Error interno al registrar pago', 'danger');
  }
});

/**
 * ============================================
 *   LISTAR PAGOS DE VENDORS
 * ============================================
 */
const vendorPaymentListBtn = document.getElementById('listVendorPayments');
const vendorPaymentList = document.getElementById('vendorPaymentList');

vendorPaymentListBtn?.addEventListener('click', async () => {
  try {
    const res = await fetch('/guyplus/payments');
    const data = await res.json();

    if (!data.ok) {
      renderMessage(vendorPaymentList, data.message, 'danger');
      return;
    }

    renderList(
      vendorPaymentList,
      data.data,
      (p) => `
        <strong>ID:</strong> ${p.id}<br>
        <strong>Vendor:</strong> ${p.vendorId}<br>
        <strong>Monto:</strong> $${p.amount}<br>
        <strong>Método:</strong> ${p.method}<br>
        <strong>Descripción:</strong> ${p.description}<br>
        <strong>Estado:</strong> ${p.status}<br>
        <strong>Fecha:</strong> ${p.createdAt}
      `
    );

  } catch (err) {
    renderMessage(vendorPaymentList, 'Error interno al listar pagos', 'danger');
  }
});
