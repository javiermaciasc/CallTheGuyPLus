// backend/services/stores.homedepot.service.js

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { StoreProduct } from '../models/stores.model.js';

/**
 * ============================================
 *   CONFIGURACIÓN API HOME DEPOT
 * ============================================
 *   NOTA:
 *   Home Depot no ofrece una API pública oficial.
 *   Este módulo simula la conexión mediante scraping
 *   o API privada, según tu arquitectura North Star.
 * ============================================
 */

const HOME_DEPOT_BASE_URL = 'https://www.homedepot.com/p';

/**
 * ============================================
 *   BUSCAR PRODUCTOS EN HOME DEPOT
 * ============================================
 */
export const searchHomeDepotProductsService = async (query) => {
  try {
    const url = `https://www.homedepot.com/s/${encodeURIComponent(query)}`;

    const response = await axios.get(url);

    if (!response.data) {
      return {
        ok: false,
        message: 'No se encontraron productos en Home Depot'
      };
    }

    // Simulación de extracción de productos
    const products = extractHomeDepotProducts(response.data);

    return {
      ok: true,
      store: 'home-depot',
      query,
      data: products
    };

  } catch (err) {
    return {
      ok: false,
      message: 'Error al buscar productos en Home Depot',
      error: err.message
    };
  }
};

/**
 * ============================================
 *   EXTRAER PRODUCTOS (SIMULACIÓN)
 * ============================================
 */
const extractHomeDepotProducts = (html) => {
  // Simulación de scraping
  const fakeProducts = [
    new StoreProduct({
      id: uuidv4(),
      store: 'home-depot',
      sku: 'HD-12345',
      name: '2x4x8 Premium Lumber',
      price: 4.75,
      url: `${HOME_DEPOT_BASE_URL}/2x4x8-Premium-Lumber-HD-12345`,
      category: 'lumber',
      image: 'https://example.com/hd-lumber.jpg'
    }),
    new StoreProduct({
      id: uuidv4(),
      store: 'home-depot',
      sku: 'HD-67890',
      name: 'Electrical Outlet 15A',
      price: 1.29,
      url: `${HOME_DEPOT_BASE_URL}/Electrical-Outlet-15A-HD-67890`,
      category: 'electrical',
      image: 'https://example.com/hd-outlet.jpg'
    })
  ];

  return fakeProducts;
};

/**
 * ============================================
 *   OBTENER DETALLE DE PRODUCTO POR SKU
 * ============================================
 */
export const getHomeDepotProductBySkuService = async (sku) => {
  try {
    const url = `${HOME_DEPOT_BASE_URL}/${sku}`;

    const response = await axios.get(url);

    if (!response.data) {
      return {
        ok: false,
        message: 'Producto no encontrado en Home Depot'
      };
    }

    const product = new StoreProduct({
      id: uuidv4(),
      store: 'home-depot',
      sku,
      name: `Producto Home Depot ${sku}`,
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
      message: 'Error al obtener producto de Home Depot',
      error: err.message
    };
  }
};
