// backend/routes/stores.routes.js

import { Router } from 'express';

import {
  createStoreOrder,
  getStoreOrder,
  updateStoreOrder,
  deleteStoreOrder,
  listStoreOrders
} from '../controllers/stores.order.controller.js';

import {
  searchMaterials,
  searchStoreProducts
} from '../controllers/stores.search.controller.js';

const router = Router();

/**
 * ============================================
 *   RUTAS: ORDENES DE TIENDAS (MATERIALES)
 * ============================================
 */
router.post('/orders', createStoreOrder);
router.get('/orders/:id', getStoreOrder);
router.put('/orders/:id', updateStoreOrder);
router.delete('/orders/:id', deleteStoreOrder);
router.get('/orders', listStoreOrders);

/**
 * ============================================
 *   RUTAS: BUSCAR MATERIALES EN GENERAL
 * ============================================
 */
router.get('/search/:query', searchMaterials);

/**
 * ============================================
 *   RUTAS: BUSCAR PRODUCTOS POR TIENDA
 * ============================================
 *   - /stores/search/home-depot/:query
 *   - /stores/search/lowes/:query
 *   - /stores/search/menards/:query
 * ============================================
 */
router.get('/search/:store/:query', searchStoreProducts);

export default router;
