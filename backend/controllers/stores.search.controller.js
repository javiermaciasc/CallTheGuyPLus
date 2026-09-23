// backend/controllers/stores.search.controller.js

import {
  searchMaterialsService,
  searchStoreProductsService
} from '../services/stores.search.service.js';

/**
 * ============================================
 *   BUSCAR MATERIALES (TIENDAS GRANDES)
 * ============================================
 *   - Home Depot
 *   - Lowe's
 *   - Menards
 *   - Otros proveedores grandes
 * ============================================
 */
export const searchMaterials = async (req, res) => {
  try {
    const { query } = req.params;

    const result = await searchMaterialsService(query);

    if (!result.ok) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al buscar materiales',
      error: err.message
    });
  }
};

/**
 * ============================================
 *   BUSCAR PRODUCTOS EN TIENDAS ESPECÍFICAS
 * ============================================
 *   - /stores/search/home-depot/:query
 *   - /stores/search/lowes/:query
 *   - /stores/search/menards/:query
 * ============================================
 */
export const searchStoreProducts = async (req, res) => {
  try {
    const { store, query } = req.params;

    const result = await searchStoreProductsService(store, query);

    if (!result.ok) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: 'Error interno al buscar productos en tienda',
      error: err.message
    });
  }
};
