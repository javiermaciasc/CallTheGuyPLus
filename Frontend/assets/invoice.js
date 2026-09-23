// frontend/assets/invoice.js

/**
 * ============================================================
 *   UI DE FACTURA BASADA EN PO
 *   SECCIÓN 11 — Mostrar factura
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

const invoiceResult = document.getElementById('invoiceResult');
const invoiceContainer = document.getElementById('invoiceContainer');

const searchInvoicePOBtn = document.getElementById('searchInvoicePOBtn');
const searchInvoiceIdBtn = document.getElementById('searchInvoiceIdBtn');
const searchAllInvoicesBtn = document.getElementById('searchAllInvoicesBtn');

/**
 * ============================================================
 *   RENDERIZAR MENSAJE
 * ============================================================
 */
const renderInvoiceMessage = (message, type = 'danger') => {
  invoiceResult.innerHTML = `
    <div class="alert alert-${type}">
      ${message}
    </div>
  `;
};

/**
 * ============================================================
 *   RENDERIZAR UNA FACTURA
 * ============================================================
 */
const renderInvoice = (invoice) => {
  invoiceContainer.innerHTML = `
    <div class="card mt-3">
      <div class="card-body">

        <h4 class="card-title">Factura #${invoice.invoiceId}</h4>
        <p><strong>PO:</strong> ${invoice.poNumber}</p>
        <p><strong>Cliente:</strong> ${invoice.clientName}</p>
        <p><strong>Fecha:</strong> ${invoice.date}</p>

        <hr>

        <h5>Items</h5>
        <ul>
          ${invoice.items.map(item => `
            <li>
              ${item.description} — Cantidad: ${item.quantity} — Precio: $${item.price}
            </li>
          `).join('')}
        </ul>

        <hr>

        <p><strong>Total:</strong> $${invoice.total}</p>

      </div>
    </div>
  `;
};

/**
 * ============================================================
 *   RENDERIZAR LISTA DE FACTURAS
 * ============================================================
 */
const renderInvoiceList = (invoices) => {
  invoiceContainer.innerHTML = '';

  invoices.forEach((invoice) => {
    const card = document.createElement('div');
    card.className = 'card mt-3';

    const body = document.createElement('div');
    body.className = 'card-body';

    body.innerHTML = `
      <h4 class="card-title">Factura #${invoice.invoiceId}</h4>
      <p><strong>PO:</strong> ${invoice.poNumber}</p>
      <p><strong>Cliente:</strong> ${invoice.clientName}</p>
      <p><strong>Fecha:</strong> ${invoice.date}</p>
      <p><strong>Total:</strong> $${invoice.total}</p>
    `;

    card.appendChild(body);
    invoiceContainer.appendChild(card);
  });
};

/**
 * ============================================================
 *   BUSCAR FACTURA POR PO
 * ============================================================
 */
searchInvoicePOBtn.addEventListener('click', async () => {
  const poNumber = document.getElementById('invoicePOInput').value;

  try {
    const res = await fetch(`/invoice/po/${poNumber}`);
    const data = await res.json();

    if (!data.ok) {
      renderInvoiceMessage(data.message || 'No se encontró factura para este PO');
      return;
    }

    renderInvoice(data.data);

  } catch (error) {
    renderInvoiceMessage('Error interno al buscar factura por PO');
  }
});

/**
 * ============================================================
 *   BUSCAR FACTURA POR ID
 * ============================================================
 */
searchInvoiceIdBtn.addEventListener('click', async () => {
  const invoiceId = document.getElementById('invoiceIdInput').value;

  try {
    const res = await fetch(`/invoice/${invoiceId}`);
    const data = await res.json();

    if (!data.ok) {
      renderInvoiceMessage(data.message || 'No se encontró factura con este ID');
      return;
    }

    renderInvoice(data.data);

  } catch (error) {
    renderInvoiceMessage('Error interno al buscar factura por ID');
  }
});

/**
 * ============================================================
 *   MOSTRAR TODAS LAS FACTURAS
 * ============================================================
 */
searchAllInvoicesBtn.addEventListener('click', async () => {
  try {
    const res = await fetch(`/invoice/all`);
    const data = await res.json();

    if (!data.ok) {
      renderInvoiceMessage(data.message || 'No se encontraron facturas');
      return;
    }

    renderInvoiceList(data.data);

  } catch (error) {
    renderInvoiceMessage('Error interno al obtener todas las facturas');
  }
});
