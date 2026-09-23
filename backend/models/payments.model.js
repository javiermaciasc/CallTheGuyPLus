// backend/models/payments.model.js

/**
 * ============================================
 *   MODELO: PAGO (CLIENTE → GUY)
 * ============================================
 *   SECCIÓN 5 — Pago del cliente al Guy
 * ============================================
 */

export class Payment {
  constructor({
    id,
    clientId,
    guyId,
    amount,
    method,
    status = 'pending',
    validated = false,
    createdAt = new Date().toISOString(),
    updatedAt = null,
    validatedAt = null
  }) {
    this.id = id;
    this.clientId = clientId;
    this.guyId = guyId;
    this.amount = amount;
    this.method = method;
    this.status = status;
    this.validated = validated;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.validatedAt = validatedAt;
  }
}
