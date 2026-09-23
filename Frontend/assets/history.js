// frontend/assets/history.js

/**
 * ============================================================
 *   UI DE HISTORIAL DE TRABAJO PERMANENTE
 *   SECCIÓN 12 — Trabajo permanente (NO se borra jamás)
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

const historyResult = document.getElementById('historyResult');
const historyList = document.getElementById('historyList');

const getHistoryByClientBtn = document.getElementById('getHistoryByClientBtn');
const getHistoryByGuyBtn = document.getElementById('getHistoryByGuyBtn');
const getHistoryByJobBtn = document.getElementById('getHistoryByJobBtn');

/**
 * ============================================================
 *   RENDERIZAR MENSAJE
 * ============================================================
 */
const renderHistoryMessage = (message, type = 'danger') => {
  historyResult.innerHTML = `
    <div class="alert alert-${type}">
      ${message}
    </div>
  `;
};

/**
 * ============================================================
 *   RENDERIZAR LISTA DE HISTORIAL
 * ============================================================
 */
const renderHistoryList = (entries) => {
  historyList.innerHTML = '';

  entries.forEach((entry) => {
    const card = document.createElement('div');
    card.className = 'card mb-3';

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.innerText = `Trabajo permanente — Job: ${entry.jobId}`;

    const client = document.createElement('p');
    client.className = 'card-text';
    client.innerHTML = `<strong>Cliente:</strong> ${entry.clientId}`;

    const guy = document.createElement('p');
    guy.className = 'card-text';
    guy.innerHTML = `<strong>Guy:</strong> ${entry.guyId}`;

    const status = document.createElement('p');
    status.className = 'card-text';
    status.innerHTML = `<strong>Estado:</strong> ${entry.status}`;

    const created = document.createElement('p');
    created.className = 'card-text';
    created.innerHTML = `<strong>Fecha:</strong> ${entry.createdAt}`;

    body.appendChild(title);
    body.appendChild(client);
    body.appendChild(guy);
    body.appendChild(status);
    body.appendChild(created);

    card.appendChild(body);
    historyList.appendChild(card);
  });
};

/**
 * ============================================================
 *   OBTENER HISTORIAL POR CLIENTE
 * ============================================================
 */
getHistoryByClientBtn.addEventListener('click', async () => {
  const clientId = document.getElementById('historyClientId').value;

  try {
    const res = await fetch(`/history/client/${clientId}`);
    const data = await res.json();

    if (!data.ok) {
      renderHistoryMessage(data.message || 'No existe historial para este cliente');
      return;
    }

    renderHistoryList(data.data);

  } catch (error) {
    renderHistoryMessage('Error interno al obtener historial del cliente');
  }
});

/**
 * ============================================================
 *   OBTENER HISTORIAL POR GUY
 * ============================================================
 */
getHistoryByGuyBtn.addEventListener('click', async () => {
  const guyId = document.getElementById('historyGuyId').value;

  try {
    const res = await fetch(`/history/guy/${guyId}`);
    const data = await res.json();

    if (!data.ok) {
      renderHistoryMessage(data.message || 'No existe historial para este Guy');
      return;
    }

    renderHistoryList(data.data);

  } catch (error) {
    renderHistoryMessage('Error interno al obtener historial del Guy');
  }
});

/**
 * ============================================================
 *   OBTENER HISTORIAL POR JOB
 * ============================================================
 */
getHistoryByJobBtn.addEventListener('click', async () => {
  const jobId = document.getElementById('historyJobId').value;

  try {
    const res = await fetch(`/history/job/${jobId}`);
    const data = await res.json();

    if (!data.ok) {
      renderHistoryMessage(data.message || 'No existe historial para este Job');
      return;
    }

    renderHistoryList(data.data);

  } catch (error) {
    renderHistoryMessage('Error interno al obtener historial del Job');
  }
});
