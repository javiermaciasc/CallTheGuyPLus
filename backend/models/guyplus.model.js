// backend/models/guyplus.model.js

/**
 * ============================================
 *   MODELO: VENDOR (GUY PLUS)
 * ============================================
 */

export class Vendor {
  constructor({
    id,
    name,
    email,
    phone,
    active = true,
    createdAt = new Date().toISOString(),
    updatedAt = null
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

/**
 * ============================================
 *   MODELO: ORDEN DE VENDOR (GUY PLUS)
 * ============================================
 */

export class VendorOrder {
  constructor({
    id,
    vendorId,
    title,
    description,
    status = 'open',
    createdAt = new Date().toISOString(),
    updatedAt = null
  }) {
    this.id = id;
    this.vendorId = vendorId;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

/**
 * ============================================
 *   MODELO: BENEFICIO DE VENDOR (GUY PLUS)
 * ============================================
 */

export class VendorBenefit {
  constructor({
    id,
    vendorId,
    title,
    description,
    active = true,
    createdAt = new Date().toISOString(),
    updatedAt = null
  }) {
    this.id = id;
    this.vendorId = vendorId;
    this.title = title;
    this.description = description;
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

/**
 * ============================================
 *   MODELO: PAGO A VENDOR (GUY PLUS)
 * ============================================
 */

export class VendorPayment {
  constructor({
    id,
    vendorId,
    amount,
    method,
    description = '',
    status = 'pending',
    createdAt = new Date().toISOString(),
    updatedAt = null
  }) {
    this.id = id;
    this.vendorId = vendorId;
    this.amount = amount;
    this.method = method;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
