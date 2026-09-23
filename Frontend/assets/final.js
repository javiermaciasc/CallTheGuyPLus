// frontend/assets/final.js

/**
 * ============================================
 *   UI PARA FOTOS FINALES DEL TRABAJO
 *   SECCIÓN 7 — Guy sube fotos finales (OBLIGATORIAS)
 * ============================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

const uploadFinalPhotosBtn = document.getElementById('uploadFinalPhotosBtn');
const getFinalPhotosJobBtn = document.getElementById('getFinalPhotosJobBtn');
const getFinalPhotosGuyBtn = document.getElementById('getFinalPhotosGuyBtn');

const finalPhotosResult = document.getElementById('finalPhotosResult');
const finalPhotosList = document.getElementById('finalPhotosList');

/**
 * ============================================
 *   RENDERIZAR MENSAJE EN UI
 * ============================================
 */
const renderFinalPhotosMessage = (message, type = 'success') => {
  finalPhotosResult.innerHTML = `
    <div class="alert alert-${type}">
      ${message}
    </div>
  `;
};

/**
 * ============================================
 *   RENDERIZAR LISTA DE FOTOS
 * ============================================
 */
const renderFinalPhotosList = (photos) => {
  finalPhotosList.innerHTML = '';

  photos.forEach((entry) => {
    const container = document.createElement('div');
    container.className = 'card mb-3';

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.innerText = `Trabajo: ${entry.jobId} — Guy: ${entry.guyId}`;

    const date = document.createElement('p');
    date.className = 'card-text';
    date.innerHTML = `<strong>Subidas:</strong> ${entry.uploadedAt}`;

    const photosGrid = document.createElement('div');
    photosGrid.className = 'd-flex flex-wrap gap-3';

    entry.photos.forEach((photoUrl) => {
      const img = document.createElement('img');
      img.src = photoUrl;
      img.className = 'img-thumbnail';
      img.style.width = '180px';
      img.style.height = '180px';
      img.style.objectFit = 'cover';
      photosGrid.appendChild(img);
    });

    body.appendChild(title);
    body.appendChild(date);
    body.appendChild(photosGrid);
    container.appendChild(body);

    finalPhotosList.appendChild(container);
  });
};

/**
 * ============================================
 *   SUBIR FOTOS FINALES
 * ============================================
 */
uploadFinalPhotosBtn.addEventListener('click', async () => {
  const jobId = document.getElementById('finalJobId').value;
  const guyId = document.getElementById('finalGuyId').value;
  const clientId = document.getElementById('finalClientId').value;
  const photosRaw = document.getElementById('finalPhotos').value;

  const photos = photosRaw.split(',').map((p) => p.trim());

  const payload = {
    jobId,
    guyId,
    clientId,
    photos,
    uploadedAt: new Date().toISOString()
  };

  try {
    const res = await fetch('/jobs/final/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!data.ok) {
      renderFinalPhotosMessage(data.message || 'Error al subir fotos finales', 'danger');
      return;
    }

    renderFinalPhotosMessage('Fotos finales subidas correctamente');
  } catch (err) {
    renderFinalPhotosMessage('Error interno al subir fotos finales', 'danger');
  }
});

/**
 * ============================================
 *   OBTENER FOTOS FINALES POR JOB
 * ============================================
 */
getFinalPhotosJobBtn.addEventListener('click', async () => {
  const jobId = document.getElementById('queryFinalJobId').value;

  try {
    const res = await fetch(`/jobs/final/job/${jobId}`);
    const data = await res.json();

    if (!data.ok) {
      renderFinalPhotosMessage(data.message || 'No se encontraron fotos finales para este trabajo', 'danger');
      return;
    }

    renderFinalPhotosList(data.data);
  } catch (err) {
    renderFinalPhotosMessage('Error interno al obtener fotos finales del trabajo', 'danger');
  }
});

/**
 * ============================================
 *   OBTENER FOTOS FINALES POR GUY
 * ============================================
 */
getFinalPhotosGuyBtn.addEventListener('click', async () => {
  const guyId = document.getElementById('queryFinalGuyId').value;

  try {
    const res = await fetch(`/jobs/final/guy/${guyId}`);
    const data = await res.json();

    if (!data.ok) {
      renderFinalPhotosMessage(data.message || 'No se encontraron fotos finales para este Guy', 'danger');
      return;
    }

    renderFinalPhotosList(data.data);
  } catch (err) {
    renderFinalPhotosMessage('Error interno al obtener fotos finales del Guy', 'danger');
  }
});
