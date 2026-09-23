// frontend/assets/profile.js

/**
 * Utilidad para hacer peticiones al backend
 */
async function apiRequest(url, method = 'GET', body = null) {
  const options = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(url, options);
  return res.json();
}

/**
 * Render genérico de perfiles
 */
function renderProfile(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="profile-card">
      <h2>${data.name}</h2>
      <p><strong>Tel:</strong> ${data.phone || 'N/A'}</p>
      ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ''}
      ${data.skills ? `<p><strong>Skills:</strong> ${data.skills.join(', ')}</p>` : ''}
      ${data.rating !== undefined ? `<p><strong>Rating:</strong> ${data.rating}</p>` : ''}
      ${data.certifications ? `<p><strong>Certificaciones:</strong> ${data.certifications.join(', ')}</p>` : ''}
      ${data.experience_years !== undefined ? `<p><strong>Años experiencia:</strong> ${data.experience_years}</p>` : ''}
      <p><small>ID: ${data.id}</small></p>
    </div>
  `;
}

/**
 * CLIENTE
 */
export async function loadClientProfile(id) {
  const result = await apiRequest(`/client/${id}`);
  if (result.ok) {
    renderProfile('clientProfileContainer', result.client);
  } else {
    console.error(result.message);
  }
}

export async function createClientProfile(payload) {
  return apiRequest('/client', 'POST', payload);
}

export async function updateClientProfile(id, payload) {
  return apiRequest(`/client/${id}`, 'PUT', payload);
}

export async function deleteClientProfile(id) {
  return apiRequest(`/client/${id}`, 'DELETE');
}

/**
 * GUY
 */
export async function loadGuyProfile(id) {
  const result = await apiRequest(`/guy/${id}`);
  if (result.ok) {
    renderProfile('guyProfileContainer', result.guy);
  } else {
    console.error(result.message);
  }
}

export async function createGuyProfile(payload) {
  return apiRequest('/guy', 'POST', payload);
}

export async function updateGuyProfile(id, payload) {
  return apiRequest(`/guy/${id}`, 'PUT', payload);
}

export async function deleteGuyProfile(id) {
  return apiRequest(`/guy/${id}`, 'DELETE');
}

/**
 * GUY PLUS
 */
export async function loadGuyPlusProfile(id) {
  const result = await apiRequest(`/guyplus/${id}`);
  if (result.ok) {
    renderProfile('guyPlusProfileContainer', result.guyplus);
  } else {
    console.error(result.message);
  }
}

export async function createGuyPlusProfile(payload) {
  return apiRequest('/guyplus', 'POST', payload);
}

export async function updateGuyPlusProfile(id, payload) {
  return apiRequest(`/guyplus/${id}`, 'PUT', payload);
}

export async function deleteGuyPlusProfile(id) {
  return apiRequest(`/guyplus/${id}`, 'DELETE');
}
