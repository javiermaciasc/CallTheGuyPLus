// frontend/assets/stores.js

/**
 * ============================================
 *   UI — MÓDULO DE TIENDAS (GRANDES PROVEEDORES)
 * ============================================
 *   - Buscar materiales
 *   - Buscar productos por tienda
 *   - Crear órdenes de materiales
 *   - Ver órdenes creadas
 * ============================================
 */

const StoresUI = {
  /**
   * ============================================
   *   BUSCAR MATERIALES (GENERAL)
   * ============================================
   */
  async searchMaterials(query) {
    try {
      const res = await fetch(`/stores/search/${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!data.ok) {
        alert(`No se encontraron materiales: ${data.message}`);
        return [];
      }

      return data.data;

    } catch (err) {
      console.error('Error al buscar materiales:', err);
      return [];
    }
  },

  /**
   * ============================================
   *   BUSCAR PRODUCTOS POR TIENDA
   * ============================================
   *   store = home-depot | lowes | menards
   * ============================================
   */
  async searchByStore(store, query) {
    try {
      const res = await fetch(`/stores/search/${store}/${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!data.ok) {
        alert(`No se encontraron productos en ${store}: ${data.message}`);
        return [];
      }

      return data.data;

    } catch (err) {
      console.error(`Error al buscar productos en ${store}:`, err);
      return [];
    }
  },

  /**
   * ============================================
   *   CREAR ORDEN DE MATERIALES
   * ============================================
   */
  async createOrder(orderPayload) {
    try {
      const res = await fetch('/stores/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();

      if (!data.ok) {
        alert(`Error al crear orden: ${data.message}`);
        return null;
      }

      alert('Orden creada correctamente');
      return data.data;

    } catch (err) {
      console.error('Error al crear orden:', err);
      return null;
    }
  },

  /**
   * ============================================
   *   OBTENER ORDEN POR ID
   * ============================================
   */
  async getOrder(id) {
    try {
      const res = await fetch(`/stores/orders/${id}`);
      const data = await res.json();

      if (!data.ok) {
        alert(`Orden no encontrada: ${data.message}`);
        return null;
      }

      return data.data;

    } catch (err) {
      console.error('Error al obtener orden:', err);
      return null;
    }
  },

  /**
   * ============================================
   *   ACTUALIZAR ORDEN
   * ============================================
   */
  async updateOrder(id, payload) {
    try {
      const res = await fetch(`/stores/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!data.ok) {
        alert(`Error al actualizar orden: ${data.message}`);
        return null;
      }

      alert('Orden actualizada correctamente');
      return data.data;

    } catch (err) {
      console.error('Error al actualizar orden:', err);
      return null;
    }
  },

  /**
   * ============================================
   *   ELIMINAR ORDEN
   * ============================================
   */
  async deleteOrder(id) {
    try {
      const res = await fetch(`/stores/orders/${id}`, {
        method: 'DELETE'
      });

      const data = await res.json();

      if (!data.ok) {
        alert(`Error al eliminar orden: ${data.message}`);
        return null;
      }

      alert('Orden eliminada correctamente');
      return data.data;

    } catch (err) {
      console.error('Error al eliminar orden:', err);
      return null;
    }
  },

  /**
   * ============================================
   *   LISTAR TODAS LAS ORDENES
   * ============================================
   */
  async listOrders() {
    try {
      const res = await fetch('/stores/orders');
      const data = await res.json();

      if (!data.ok) {
        alert(`Error al listar órdenes: ${data.message}`);
        return [];
      }

      return data.data;

    } catch (err) {
      console.error('Error al listar órdenes:', err);
      return [];
    }
  }
};

export default StoresUI;
