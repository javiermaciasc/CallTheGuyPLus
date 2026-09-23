// backend/repository/payments.repository.js

import { MaterialPayment, GuyConfirmation } from '../models/materials.payment.model.js';

/**
 * Este archivo implementa el repositorio de pagos
 * para:
 *  - Pago de materiales
 *  - Confirmación del Guy
 *
 * Siguiendo la arquitectura de 16 secciones (North Star),
 * este repositorio es la única capa que habla con la base de datos
 * para estos dos dominios.
 */

/**
 * Simulación de acceso a base de datos.
 * En producción, estos métodos deben conectarse a tu motor real:
 *  - PostgreSQL / MySQL / MongoDB / etc.
 *
 * Aquí se usan funciones genéricas db.query / db.insert / db.update / db.delete
 * que tú puedes mapear a tu implementación real.
 */

import { db } from '../database/db.client.js';

/**
 * ============================================
 *   REPOSITORIO: PAGO DE MATERIALES
 * ============================================
 */

/**
 * Crear registro de pago de materiales
 */
export async function insertMaterialPayment(payload) {
  const payment = new MaterialPayment({
    id: payload.id,
    clientId: payload.clientId,
    guyId: payload.guyId,
    amount: payload.amount,
    description: payload.description,
    status: payload.status ?? 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: null
  });

  const query = `
    INSERT INTO material_payments
      (id, client_id, guy_id, amount, description, status, created_at, updated_at)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8)
  `;

  const params = [
    payment.id,
    payment.clientId,
    payment.guyId,
    payment.amount,
    payment.description,
    payment.status,
    payment.createdAt,
    payment.updatedAt
  ];

  await db.query(query, params);

  return payment;
}

/**
 * Obtener pago de materiales por ID
 */
export async function findMaterialPaymentById(id) {
  const query = `
    SELECT id, client_id, guy_id, amount, description, status, created_at, updated_at
    FROM material_payments
    WHERE id = $1
    LIMIT 1
  `;

  const result = await db.query(query, [id]);

  if (!result.rows || result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];

  return new MaterialPayment({
    id: row.id,
    clientId: row.client_id,
    guyId: row.guy_id,
    amount: row.amount,
    description: row.description,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  });
}

/**
 * Actualizar estado de pago de materiales
 */
export async function updateMaterialPayment(id, updates) {
  const existing = await findMaterialPaymentById(id);
  if (!existing) return null;

  const newStatus = updates.status ?? existing.status;
  const updatedAt = new Date().toISOString();

  const query = `
    UPDATE material_payments
    SET status = $1,
        updated_at = $2
    WHERE id = $3
  `;

  await db.query(query, [newStatus, updatedAt, id]);

  existing.status = newStatus;
  existing.updatedAt = updatedAt;

  return existing;
}

/**
 * Eliminar pago de materiales
 */
export async function deleteMaterialPaymentById(id) {
  const query = `
    DELETE FROM material_payments
    WHERE id = $1
  `;

  const result = await db.query(query, [id]);
  return result.rowCount > 0;
}

/**
 * ============================================
 *   REPOSITORIO: CONFIRMACIÓN DEL GUY
 * ============================================
 */

/**
 * Crear registro de confirmación del Guy
 */
export async function insertGuyConfirmation(payload) {
  const confirmation = new GuyConfirmation({
    id: payload.id,
    paymentId: payload.paymentId,
    guyId: payload.guyId,
    confirmed: payload.confirmed ?? false,
    confirmationDate: payload.confirmationDate ?? null,
    createdAt: new Date().toISOString(),
    updatedAt: null
  });

  const query = `
    INSERT INTO guy_confirmations
      (id, payment_id, guy_id, confirmed, confirmation_date, created_at, updated_at)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7)
  `;

  const params = [
    confirmation.id,
    confirmation.paymentId,
    confirmation.guyId,
    confirmation.confirmed,
    confirmation.confirmationDate,
    confirmation.createdAt,
    confirmation.updatedAt
  ];

  await db.query(query, params);

  return confirmation;
}

/**
 * Obtener confirmación del Guy por ID
 */
export async function findGuyConfirmationById(id) {
  const query = `
    SELECT id, payment_id, guy_id, confirmed, confirmation_date, created_at, updated_at
    FROM guy_confirmations
    WHERE id = $1
    LIMIT 1
  `;

  const result = await db.query(query, [id]);

  if (!result.rows || result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];

  return new GuyConfirmation({
    id: row.id,
    paymentId: row.payment_id,
    guyId: row.guy_id,
    confirmed: row.confirmed,
    confirmationDate: row.confirmation_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  });
}

/**
 * Actualizar estado de confirmación del Guy
 */
export async function updateGuyConfirmation(id, updates) {
  const existing = await findGuyConfirmationById(id);
  if (!existing) return null;

  const confirmed = updates.confirmed ?? existing.confirmed;
  const confirmationDate =
    updates.confirmationDate ?? (confirmed ? new Date().toISOString() : existing.confirmationDate);
  const updatedAt = new Date().toISOString();

  const query = `
    UPDATE guy_confirmations
    SET confirmed = $1,
        confirmation_date = $2,
        updated_at = $3
    WHERE id = $4
  `;

  await db.query(query, [confirmed, confirmationDate, updatedAt, id]);

  existing.confirmed = confirmed;
  existing.confirmationDate = confirmationDate;
  existing.updatedAt = updatedAt;

  return existing;
}

/**
 * Eliminar confirmación del Guy
 */
export async function deleteGuyConfirmationById(id) {
  const query = `
    DELETE FROM guy_confirmations
    WHERE id = $1
  `;

  const result = await db.query(query, [id]);
  return result.rowCount > 0;
}
