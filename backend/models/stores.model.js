// backend/models/stores.model.js

/**
 * ============================================
 *   MODELO: TIENDA (GRANDES PROVEEDORES)
 * ============================================
 *   - Home Depot
 *   - Lowe's
 *   - Menards
 *   - Otros proveedores grandes
 * ============================================
 */

export class Store {
  constructor({
    id,
    name,
    address,
    phone,
    email,
    createdAt = new Date().toISOString(),
    updatedAt = null
  }) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phone = phone || null;
    this.email = email || null;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

/**
 * ============================================
 *   MODELO: PRODUCTO DE TIENDA
 * ============================================
 *   Representa un material o producto encontrado
 *   en Home Depot, Lowe's, Menards, etc.
 * ============================================
 */

export class StoreProduct {
  constructor({
    id,
    store,
    sku,
    name,
    price,
    url,
    category,
    image,
    createdAt = new Date().toISOString()
  }) {
    this.id = id;
    this.store = store;          // home-depot | lowes | menards | etc.
    this.sku = sku;              // código del producto
    this.name = name;            // nombre del material
    this.price = price;          // precio actual
    this.url = url;              // link directo al producto
    this.category = category;    // lumber, electrical, plumbing, etc.
    this.image = image;          // imagen del producto
    this.createdAt = createdAt;
  }
}

/**
 * ============================================
 *   MODELO: ORDEN DE TIENDA (MATERIALES)
 * ============================================
 *   Orden generada para comprar materiales
 *   en tiendas grandes.
 * ============================================
 */

export class StoreOrder {
  constructor({
    id,
    store,
    items,
    notes,
    status = 'pending',
    createdAt = new Date().toISOString(),
    updatedAt = null
  }) {
    this.id = id;
    this.store = store;          // home-depot | lowes | menards
    this.items = items;          // array de productos { sku, qty }
    this.notes = notes || '';
    this.status = status;        // pending | ordered | delivered | cancelled
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
