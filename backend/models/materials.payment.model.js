// backend/models/materials.payment.model.js

/**
 * ============================================
 *   MODELO: PAGO DE MATERIALES
 *   SECCIÓN nueva 2 — PAGO (CLIENTE → GUY)
 * ============================================
 */

export class MaterialPayment {
  constructor({
    id,
    clientId,
    guyId,
    amount,
    description,
    status = 'pending',
    createdAt = new Date().toISOString(),
    updatedAt = null
  }) {
    this.id = id;
    this.clientId = clientId;
    this.guyId = guyId;
    this.amount = amount;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

/**
 * ============================================
 *   MODELO: CONFIRMACIÓN DEL GUY
 *   SECCIÓN nueva 2 — PAGO (CLIENTE → GUY)
 * ============================================
 */

export class GuyConfirmation {
  constructor({
    id,
    paymentId,
    guyId,
    confirmed = false,
    confirmationDate = null,
    createdAt = new Date().toISOString(),
    updatedAt = null
  }) {
    this.id = id;
    this.paymentId = paymentId;
    this.guyId = guyId;
    this.confirmed = confirmed;
    this.confirmationDate = confirmationDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
