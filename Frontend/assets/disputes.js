// frontend/assets/disputes.js

/**
 * ============================================
 *   UI PARA MANEJO DE DISPUTAS
 *   SECCIÓN 8 — Cliente abre disputa / Guy responde
 * ============================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

const disputeCreateBtn = document.getElementById('disputeCreateBtn');
const disputeRespondBtn = document.getElementById('disputeRespondBtn');
const disputeGetJobBtn = document.getElementById('disputeGetJobBtn');
const disputeGetClientBtn = document.getElementById('disputeGetClientBtn');
const disputeGetGuyBtn = document.getElementById('disputeGetGuyBtn');

const disputeResult = document.getElementById('disputeResult');
const disputeList = document.getElementById('disputeList');

/**
 * ============================================
 *   RENDERIZAR MENSAJE EN UI
 * ============================================
 */
const renderDisputeMessage = (message, type = 'success') => {
  disputeResult.innerHTML = `
    <div class="alert alert-${type}">
      ${message}
    </div>
  `;
};

/**
 * ============================================
 *   RENDERIZAR LISTA DE DISPUTAS
 * ============================================
 */
const renderDisputeList = (disputes) => {
  disputeList.innerHTML = '';

  disputes.forEach((entry) => {
    const container = document.createElement('div');
    container.className = 'card mb-3';

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.innerText = `Trabajo: ${entry.jobId} — Cliente: ${entry.clientId} — Guy: ${entry.guyId}`;

    const reason = document.createElement('p');
    reason.className = 'card-text';
    reason.innerHTML = `<strong>Razón:</strong> ${entry.reason}`;

    const description = document.createElement('p');
    description.className = 'card-text';
    description.innerHTML = `<strong>Descripción:</strong> ${entry.description}`;

    const status = document.createElement('p');
    status.className = 'card-text';
    status.innerHTML = `<strong>Status:</strong> ${entry.status}`;

    const created = document.createElement('p');
    created.className = 'card-text';
    created.innerHTML = `<strong>Creada:</strong> ${entry.createdAt}`;

    if (entry.response) {
      const response = document.createElement('p');
      response.className = 'card-text';
      response.innerHTML = `<strong>Respuesta del Guy:</strong> ${entry.response}`;
      body.appendChild(response);
    }

    if (entry.respondedAt) {
      const respondedAt = document.createElement('p');
      respondedAt.className = 'card-text';
      respondedAt.innerHTML = `<strong>Respondida:</strong> ${entry.respondedAt}`;
      body.appendChild(respondedAt);
    }

    body.appendChild(title);
    body.appendChild(reason);
    body.appendChild(description);
    body.appendChild(status);
    body.appendChild(created);

    container.appendChild(body);
    disputeList.appendChild(container);
  });
};

/**
 * ============================================
 *   CREAR DISPUTA (CLIENTE)
 * ============================================
 */
disputeCreateBtn.addEventListener('click', async () => {
  const jobId = document.getElementById('disputeJobId').value;
  const clientId = document.getElementById('disputeClientId').value;
  const guyId = document.getElementById('disputeGuyId').value;
  const reason = document.getElementById('disputeReason').value;
  const description = document.getElementById('disputeDescription').value;

  const payload = {
    jobId,
    clientId,
    guyId,
    reason,
    description,
    createdAt: new Date().toISOString()
  };

  try {
    const res = await fetch('/disputes/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!data.ok) {
      renderDisputeMessage(data.message || 'Error al crear disputa', 'danger');
      return;
    }

    renderDisputeMessage('Disputa creada correctamente');
  } catch (err) {
    renderDisputeMessage('Error interno al crear disputa', 'danger');
  }
});

/**
 * ============================================
 *   RESPONDER DISPUTA (GUY)
 * ============================================
 */
disputeRespondBtn.addEventListener('click', async () => {
  const disputeId = document.getElementById('respondDisputeId').value;
  const guyId = document.getElementById('respondGuyId').value;
  const response = document.getElementById('respondText').value;

  const payload = {
    disputeId,
    guyId,
    response,
    respondedAt: new Date().toISOString()
  };

  try {
    const res = await fetch('/disputes/respond', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!data.ok) {
      renderDisputeMessage(data.message || 'Error al responder disputa', 'danger');
      return;
    }

    renderDisputeMessage('Respuesta enviada correctamente');
  } catch (err) {
    renderDisputeMessage('Error interno al responder disputa', 'danger');
  }
});

/**
 * ============================================
 *   OBTENER DISPUTA POR JOB
 * ============================================
 */
disputeGetJobBtn.addEventListener('click', async () => {
  const jobId = document.getElementById('queryDisputeJobId').value;

  try {
    const res = await fetch(`/disputes/job/${jobId}`);
    const data = await res.json();

    if (!data.ok) {
      renderDisputeMessage(data.message || 'No se encontró disputa para este trabajo', 'danger');
      return;
    }

    renderDisputeList([data.data]);
  } catch (err) {
    renderDisputeMessage('Error interno al obtener disputa por trabajo', 'danger');
  }
});

/**
 * ============================================
 *   OBTENER DISPUTAS POR CLIENTE
 * ============================================
 */
disputeGetClientBtn.addEventListener('click', async () => {
  const clientId = document.getElementById('queryDisputeClientId').value;

  try {
    const res = await fetch(`/disputes/client/${clientId}`);
    const data = await res.json();

    if (!data.ok) {
      renderDisputeMessage(data.message || 'No se encontraron disputas para este cliente', 'danger');
      return;
    }

    renderDisputeList(data.data);
  } catch (err) {
    renderDisputeMessage('Error interno al obtener disputas del cliente', 'danger');
  }
});

/**
 * ============================================
 *   OBTENER DISPUTAS POR GUY
 * ============================================
 */
disputeGetGuyBtn.addEventListener('click', async () => {
  const guyId = document.getElementById('queryDisputeGuyId').value;

  try {
    const res = await fetch(`/disputes/guy/${guyId}`);
    const data = await res.json();

    if (!data.ok) {
      renderDisputeMessage(data.message || 'No se encontraron disputas para este Guy', 'danger');
      return;
    }

    renderDisputeList(data.data);
  } catch (err) {
    renderDisputeMessage('Error interno al obtener disputas del Guy', 'danger');
  }
});
