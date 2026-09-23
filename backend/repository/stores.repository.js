// backend/repository/stores.repository.js

import { Store, StoreProduct, StoreOrder } from '../models/stores.model.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * ============================================
 *   BASES DE DATOS EN MEMORIA (SIMULACIÓN)
 * ============================================
 */
const storesDB = [];
const storeProductsDB = [];
const storeOrdersDB = [];

/**
 * ============================================
 *   REPOSITORY: TIENDAS GRANDES
 * ============================================
 */
export const storesRepository = {
  create: (payload) => {
    const store = new Store({
      id: uuidv4(),
      ...payload
    });

    storesDB.push(store);
    return store;
  },

  findById: (id) => storesDB.find((s) => s.id === id),

  update: (id, payload) => {
    const index = storesDB.findIndex((s) => s.id === id);
    if (index === -1) return null;

    storesDB[index] = {
      ...storesDB[index],
      ...payload,
      updatedAt: new Date().toISOString()
    };

    return storesDB[index];
  },

  delete: (id) => {
    const index = storesDB.findIndex((s) => s.id === id);
    if (index === -1) return null;

    return storesDB.splice(index, 1)[0];
  },

  list: () => storesDB
};

/**
 * ============================================
 *   REPOSITORY: PRODUCTOS DE TIENDAS
 * ============================================
 */
export const storeProductsRepository = {
  create: (payload) => {
    const product = new StoreProduct({
      id: uuidv4(),
      ...payload
    });

    storeProductsDB.push(product);
    return product;
  },

  findById: (id) => storeProductsDB.find((p) => p.id === id),

  findByStore: (store) =>
    storeProductsDB.filter((p) => p.store === store),

  search: (query) =>
    storeProductsDB.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    ),

  update: (id, payload) => {
    const index = storeProductsDB.findIndex((p) => p.id === id);
    if (index === -1) return null;

    storeProductsDB[index] = {
      ...storeProductsDB[index],
      ...payload
    };

    return storeProductsDB[index];
  },

  delete: (id) => {
    const index = storeProductsDB.findIndex((p) => p.id === id);
    if (index === -1) return null;

    return storeProductsDB.splice(index, 1)[0];
  },

  list: () => storeProductsDB
};

/**
 * ============================================
 *   REPOSITORY: ORDENES DE TIENDAS (MATERIALES)
 * ============================================
 */
export const storeOrdersRepository = {
  create: (payload) => {
    const order = new StoreOrder({
      id: uuidv4(),
      ...payload
    });

    storeOrdersDB.push(order);
    return order;
  },

  findById: (id) => storeOrdersDB.find((o) => o.id === id),

  update: (id, payload) => {
    const index = storeOrdersDB.findIndex((o) => o.id === id);
    if (index === -1) return null;

    storeOrdersDB[index] = {
      ...storeOrdersDB[index],
      ...payload,
      updatedAt: new Date().toISOString()
    };

    return storeOrdersDB[index];
  },

  delete: (id) => {
    const index = storeOrdersDB.findIndex((o) => o.id === id);
    if (index === -1) return null;

    return storeOrdersDB.splice(index, 1)[0];
  },

  list: () => storeOrdersDB
};
