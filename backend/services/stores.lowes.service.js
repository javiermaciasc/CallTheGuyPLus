// backend/services/stores.lowes.service.js

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { StoreProduct } from '../models/stores.model.js';

/**
 * ============================================
 *   CONFIGURACIÓN API LOWE'S
 * ============================================
 *   NOTA:
 *   Lowe’s tampoco ofrece una API pública oficial.
 *   Este módulo simula la conexión mediante scraping
 *   o API privada, según tu arquitectura North Star.
 * ============================================
 */

const LOWES_BASE_URL = 'https://www.lowes.com/pd';

/**
 * ============================================
 *   BUSCAR PRODUCTOS EN LOWE'S
 * ============================================
 */
export const searchLowesProductsService = async (query) => {
  try {
    const url = `https://www.lowes.com/search?searchTerm=${encodeURIComponent(query)}`;

    const response = await axios.get(url);

    if (!response.data) {
      return {
        ok: false,
        message: 'No se encontraron productos en Lowe’s'
      };
    }

    // Simulación de extracción de productos
    const products = extractLowesProducts(response.data);

    return {
      ok: true,
      store: 'lowes',
      query,
      data: products
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error al buscar productos en Lowe’s',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   EXTRAER PRODUCTOS (SIMULACIÓN)
 * ============================================
 */
const extractLowesProducts = (html) => {
  // Simulación de scraping
  const fakeProducts = [
    new StoreProduct({
      id: uuidv4(),
      store: 'lowes',
      sku: 'LW-55555',
      name: '2x6x10 Lumber Standard',
      price: 7.98,
      url: `${LOWES_BASE_URL}/2x6x10-Lumber-Standard-LW-55555`,
      category: 'lumber',
      image: 'https://example.com/lowes-lumber.jpg'
    }),
    new StoreProduct({
      id: uuidv4(),
      store: 'lowes',
      sku: 'LW-99999',
      name: 'GFCI Outlet 20A',
      price: 14.99,
      url: `${LOWES_BASE_URL}/GFCI-Outlet-20A-LW-99999`,
      category: 'electrical',
      image: 'https://example.com/lowes-gfci.jpg'
    })
  ];

  return fakeProducts;
};

/**
 * ============================================
 *   OBTENER DETALLE DE PRODUCTO POR SKU
 * ============================================
 */
export const getLowesProductBySkuService = async (sku) => {
  try {
    const url = `${LOWES_BASE_URL}/${sku}`;

    const response = await axios.get(url);

    if (!response.data) {
      return {
        ok: false,
        message: 'Producto no encontrado en Lowe’s'
      };
    }

    const product = new StoreProduct({
      id: uuidv4(),
      store: 'lowes',
      sku,
      name: `Producto Lowe’s ${sku}`,
      price: 0,
      url,
      category: 'unknown',
      image: null
    });

    return {
      ok: true,
      data: product
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error al obtener producto de Lowe’s',
      error: err.message
    };
  }
};
