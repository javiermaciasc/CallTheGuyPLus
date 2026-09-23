// frontend/assets/progress.js

/**
 * ============================================
 *   UI DE PROGRESO DEL TRABAJO (GUY)
 *   SECCIÓN 6 — Guy realiza el trabajo
 * ============================================
 */

const startJobBtn = document.getElementById('startJobBtn');
const updateProgressBtn = document.getElementById('updateProgressBtn');
const jobProgressResult = document.getElementById('jobProgressResult');
const jobProgressList = document.getElementById('jobProgressList');

/**
 * Renderizar resultado en pantalla
 */
const renderProgressResult = (message, type = 'success') => {
  jobProgressResult.innerHTML = `
    <div class="alert alert-${type}">
      ${message}
    </div>
  `;
};

/**
 * Renderizar lista de progreso
 */
const renderProgressList = (progressEntries) => {
  jobProgressList.innerHTML = '';

  progressEntries.forEach((entry) => {
    const item = document.createElement('li');
    item.className = 'list-group-item';

    item.innerHTML = `
      <strong>Trabajo:</strong> ${entry.jobId}<br>
      <strong>Guy:</strong> ${entry.guyId}<br>
      <strong>Cliente:</strong> ${entry.clientId}<br>
      <strong>Progreso:</strong> ${entry.progress}%<br>
      <strong>Estado:</strong> ${entry.status}<br>
      <strong>Nota:</strong> ${entry.note}<br>
      <strong>Inicio:</strong> ${entry.startedAt}<br>
      <strong>Última actualización:</strong> ${entry.updatedAt}
    `;

    jobProgressList.appendChild(item);
  });
};

/**
 * ============================================
 *   REGISTRAR INICIO DEL TRABAJO
 * ============================================
 */
startJobBtn.addEventListener('click', async () => {
  const payload = {
    jobId: document.getElementById('jobIdStart').value,
    guyId: document.getElementById('guyIdStart').value,
    clientId: document.getElementById('clientIdStart').value,
    startedAt: new Date().toISOString()
  };

  try {
    const res = await fetch('/jobs/progress/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!data.ok) {
      renderProgressResult(data.message || 'Error al iniciar trabajo', 'danger');
      return;
    }

    renderProgressResult('Trabajo iniciado correctamente');
  } catch (err) {
    renderProgressResult('Error interno al iniciar trabajo', 'danger');
  }
});

/**
 * ============================================
 *   REGISTRAR PROGRESO DEL TRABAJO
 * ============================================
 */
updateProgressBtn.addEventListener('click', async () => {
  const payload = {
    jobId: document.getElementById('jobIdUpdate').value,
    guyId: document.getElementById('guyIdUpdate').value,
    progress: Number(document.getElementById('progressValue').value),
    status: document.getElementById('progressStatus').value,
    note: document.getElementById('progressNote').value,
    updatedAt: new Date().toISOString()
  };

  try {
    const res = await fetch('/jobs/progress/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!data.ok) {
      renderProgressResult(data.message || 'Error al actualizar progreso', 'danger');
      return;
    }

    renderProgressResult('Progreso actualizado correctamente');
  } catch (err) {
    renderProgressResult('Error interno al actualizar progreso', 'danger');
  }
});

/**
 * ============================================
 *   OBTENER PROGRESO POR JOB
 * ============================================
 */
document.getElementById('getJobProgressBtn').addEventListener('click', async () => {
  const jobId = document.getElementById('jobIdQuery').value;

  try {
    const res = await fetch(`/jobs/progress/job/${jobId}`);
    const data = await res.json();

    if (!data.ok) {
      renderProgressResult(data.message || 'No se encontró progreso del trabajo', 'danger');
      return;
    }

    renderProgressList(data.data);
  } catch (err) {
    renderProgressResult('Error interno al obtener progreso del trabajo', 'danger');
  }
});

/**
 * ============================================
 *   OBTENER PROGRESO POR GUY
 * ============================================
 */
document.getElementById('getGuyProgressBtn').addEventListener('click', async () => {
  const guyId = document.getElementById('guyIdQuery').value;

  try {
    const res = await fetch(`/jobs/progress/guy/${guyId}`);
    const data = await res.json();

    if (!data.ok) {
      renderProgressResult(data.message || 'No se encontró progreso del Guy', 'danger');
      return;
    }

    renderProgressList(data.data);
  } catch (err) {
    renderProgressResult('Error interno al obtener progreso del Guy', 'danger');
  }
});
