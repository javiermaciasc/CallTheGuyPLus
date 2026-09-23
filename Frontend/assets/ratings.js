// frontend/assets/ratings.js

/**
 * ============================================================
 *   UI DE CALIFICACIÓN
 *   SECCIÓN 9 — Calificación del cliente hacia el Guy
 *   SECCIÓN 10 — Calificación del Guy hacia el cliente
 * ============================================================
 *
 * Archivo COMPLETO, sin recortes, sin reducciones,
 * sin simplificaciones, sin eliminar nada.
 * Tal como debe existir en producción.
 */

const ratingCreateBtn = document.getElementById('ratingCreateBtn');
const ratingResult = document.getElementById('ratingResult');
const ratingList = document.getElementById('ratingList');

const getRatingsGuyBtn = document.getElementById('getRatingsGuyBtn');
const getRatingsClientBtn = document.getElementById('getRatingsClientBtn');

/**
 * ============================================================
 *   RENDERIZAR MENSAJE EN UI
 * ============================================================
 */
const renderRatingMessage = (message, type = 'success') => {
  ratingResult.innerHTML = `
    <div class="alert alert-${type}">
      ${message}
    </div>
  `;
};

/**
 * ============================================================
 *   RENDERIZAR LISTA DE RATINGS
 * ============================================================
 */
const renderRatingsList = (ratings) => {
  ratingList.innerHTML = '';

  ratings.forEach((entry) => {
    const container = document.createElement('div');
    container.className = 'card mb-3';

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.innerText = `Rating: ${entry.stars} ⭐ — Job: ${entry.jobId}`;

    const rater = document.createElement('p');
    rater.className = 'card-text';
    rater.innerHTML = `<strong>Calificador:</strong> ${entry.raterType} (${entry.raterId})`;

    const ratee = document.createElement('p');
    ratee.className = 'card-text';
    ratee.innerHTML = `<strong>Calificado:</strong> ${entry.rateeType} (${entry.rateeId})`;

    const comment = document.createElement('p');
    comment.className = 'card-text';
    comment.innerHTML = `<strong>Comentario:</strong> ${entry.comment}`;

    const created = document.createElement('p');
    created.className = 'card-text';
    created.innerHTML = `<strong>Fecha:</strong> ${entry.createdAt}`;

    if (entry.evidencePdf) {
      const pdf = document.createElement('p');
      pdf.className = 'card-text';
      pdf.innerHTML = `<strong>PDF Evidencia:</strong> ${entry.evidencePdf}`;
      body.appendChild(pdf);
    }

    body.appendChild(title);
    body.appendChild(rater);
    body.appendChild(ratee);
    body.appendChild(comment);
    body.appendChild(created);

    container.appendChild(body);
    ratingList.appendChild(container);
  });
};

/**
 * ============================================================
 *   CREAR RATING (CLIENTE → GUY o GUY → CLIENTE)
 * ============================================================
 */
ratingCreateBtn.addEventListener('click', async () => {
  const raterId = document.getElementById('ratingRaterId').value;
  const raterType = document.getElementById('ratingRaterType').value; // client | guy
  const rateeId = document.getElementById('ratingRateeId').value;
  const rateeType = document.getElementById('ratingRateeType').value; // client | guy
  const jobId = document.getElementById('ratingJobId').value;
  const stars = parseInt(document.getElementById('ratingStars').value);
  const comment = document.getElementById('ratingComment').value;
  const evidencePdf = document.getElementById('ratingEvidencePdf').value;

  const payload = {
    raterId,
    raterType,
    rateeId,
    rateeType,
    jobId,
    stars,
    comment,
    evidencePdf,
    createdAt: new Date().toISOString()
  };

  try {
    const res = await fetch('/ratings/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!data.ok) {
      renderRatingMessage(data.message || 'Error al crear rating', 'danger');
      return;
    }

    renderRatingMessage('Rating creado correctamente');
  } catch (err) {
    renderRatingMessage('Error interno al crear rating', 'danger');
  }
});

/**
 * ============================================================
 *   OBTENER RATINGS RECIBIDOS POR UN GUY
 * ============================================================
 */
getRatingsGuyBtn.addEventListener('click', async () => {
  const guyId = document.getElementById('queryRatingsGuyId').value;

  try {
    const res = await fetch(`/ratings/guy/${guyId}`);
    const data = await res.json();

    if (!data.ok) {
      renderRatingMessage(data.message || 'No se encontraron ratings para este Guy', 'danger');
      return;
    }

    renderRatingsList(data.data);
  } catch (err) {
    renderRatingMessage('Error interno al obtener ratings del Guy', 'danger');
  }
});

/**
 * ============================================================
 *   OBTENER RATINGS RECIBIDOS POR UN CLIENTE
 * ============================================================
 */
getRatingsClientBtn.addEventListener('click', async () => {
  const clientId = document.getElementById('queryRatingsClientId').value;

  try {
    const res = await fetch(`/ratings/client/${clientId}`);
    const data = await res.json();

    if (!data.ok) {
      renderRatingMessage(data.message || 'No se encontraron ratings para este cliente', 'danger');
      return;
    }

    renderRatingsList(data.data);
  } catch (err) {
    renderRatingMessage('Error interno al obtener ratings del cliente', 'danger');
  }
});
