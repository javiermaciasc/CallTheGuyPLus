// backend/validation/payments.section5.validation.js

/**
 * ============================================
 *   VALIDACIÓN: PAGO DEL CLIENTE AL GUY
 *   SECCIÓN 5 — Pago del cliente al Guy
 * ============================================
 */

export const validatePaymentData = (data) => {
  const errors = [];

  // ID del cliente
  if (!data.clientId) {
    errors.push('El clientId es obligatorio.');
  }

  // ID del Guy
  if (!data.guyId) {
    errors.push('El guyId es obligatorio.');
  }

  // Monto
  if (data.amount === undefined || data.amount === null) {
    errors.push('El monto (amount) es obligatorio.');
  } else if (typeof data.amount !== 'number' || data.amount <= 0) {
    errors.push('El monto debe ser un número mayor a 0.');
  }

  // Método de pago
  const validMethods = ['cash', 'card', 'transfer', 'deposit'];
  if (!data.method) {
    errors.push('El método de pago (method) es obligatorio.');
  } else if (!validMethods.includes(data.method)) {
    errors.push(`El método de pago debe ser uno de: ${validMethods.join(', ')}`);
  }

  // Estado del pago
  const validStatus = ['pending', 'completed', 'failed'];
  if (!data.status) {
    errors.push('El estado del pago (status) es obligatorio.');
  } else if (!validStatus.includes(data.status)) {
    errors.push(`El estado del pago debe ser uno de: ${validStatus.join(', ')}`);
  }

  // Validación del Guy
  if (data.validated !== undefined && typeof data.validated !== 'boolean') {
    errors.push('El campo validated debe ser booleano.');
  }

  // Fecha de validación
  if (data.validatedAt !== undefined && data.validatedAt !== null) {
    const date = new Date(data.validatedAt);
    if (isNaN(date.getTime())) {
      errors.push('La fecha validatedAt no es válida.');
    }
  }

  return {
    ok: errors.length === 0,
    errors
  };
};

/**
 * ============================================
 *   VALIDACIÓN: CONFIRMACIÓN DEL GUY
 *   SECCIÓN 5 — Pago del cliente al Guy
 * ============================================
 */

export const validateGuyConfirmation = (data) => {
  const errors = [];

  if (!data.paymentId) {
    errors.push('El paymentId es obligatorio.');
  }

  if (!data.guyId) {
    errors.push('El guyId es obligatorio.');
  }

  if (data.confirmed === undefined) {
    errors.push('El campo confirmed es obligatorio.');
  } else if (typeof data.confirmed !== 'boolean') {
    errors.push('El campo confirmed debe ser booleano.');
  }

  if (data.confirmationDate !== undefined && data.confirmationDate !== null) {
    const date = new Date(data.confirmationDate);
    if (isNaN(date.getTime())) {
      errors.push('La fecha confirmationDate no es válida.');
    }
  }

  return {
    ok: errors.length === 0,
    errors
  };
};
