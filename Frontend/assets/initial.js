// frontend/assets/initial.js

/**
 * ============================================
 *   UI — MÓDULO INICIAL DEL CLIENTE
 * ============================================
 *   - Subir fotos iniciales
 *   - Guardar notas iniciales
 *   - Mostrar fotos iniciales
 *   - Mostrar notas iniciales
 * ============================================
 */

const InitialUI = {
  /**
   * ============================================
   *   SUBIR FOTOS INICIALES DEL CLIENTE
   * ============================================
   */
  async uploadInitialPhotos(jobId, files) {
    try {
      const formData = new FormData();

      for (const file of files) {
        formData.append('photos', file);
      }

      const res = await fetch(`/jobs/${jobId}/initial/photos`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (!data.ok) {
        alert(`Error al subir fotos iniciales: ${data.message}`);
        return null;
      }

      alert('Fotos iniciales subidas correctamente');
      return data.data;

    } catch (err) {
      console.error('Error al subir fotos iniciales:', err);
      return null;
    }
  },

  /**
   * ============================================
   *   GUARDAR NOTAS INICIALES DEL CLIENTE
   * ============================================
   */
  async saveInitialNotes(jobId, notes) {
    try {
      const res = await fetch(`/jobs/${jobId}/initial/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes })
      });

      const data = await res.json();

      if (!data.ok) {
        alert(`Error al guardar notas iniciales: ${data.message}`);
        return null;
      }

      alert('Notas iniciales guardadas correctamente');
      return data.data;

    } catch (err) {
      console.error('Error al guardar notas iniciales:', err);
      return null;
    }
  },

  /**
   * ============================================
   *   MOSTRAR FOTOS INICIALES DEL CLIENTE
   * ============================================
   */
  async getInitialPhotos(jobId) {
    try {
      const res = await fetch(`/jobs/${jobId}/initial/photos`);
      const data = await res.json();

      if (!data.ok) {
        alert(`No se pudieron obtener las fotos iniciales: ${data.message}`);
        return [];
      }

      return data.data;

    } catch (err) {
      console.error('Error al obtener fotos iniciales:', err);
      return [];
    }
  },

  /**
   * ============================================
   *   MOSTRAR NOTAS INICIALES DEL CLIENTE
   * ============================================
   */
  async getInitialNotes(jobId) {
    try {
      const res = await fetch(`/jobs/${jobId}/initial/notes`);
      const data = await res.json();

      if (!data.ok) {
        alert(`No se pudieron obtener las notas iniciales: ${data.message}`);
        return null;
      }

      return data.data;

    } catch (err) {
      console.error('Error al obtener notas iniciales:', err);
      return null;
    }
  }
};

export default InitialUI;
