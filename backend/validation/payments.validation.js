// backend/validation/payments.validation.js

import Joi from 'joi';

/**
 * ============================================
 *   VALIDACIÓN DE PAGO (CLIENTE → GUY)
 * ============================================
 */

export const paymentValidationSchema = Joi.object({
  clientId: Joi.string().uuid().required().messages({
    'any.required': 'El clientId es obligatorio',
    'string.empty': 'El clientId no puede estar vacío',
    'string.guid': 'El clientId debe ser un UUID válido'
  }),

  guyId: Joi.string().uuid().required().messages({
    'any.required': 'El guyId es obligatorio',
    'string.empty': 'El guyId no puede estar vacío',
    'string.guid': 'El guyId debe ser un UUID válido'
  }),

  amount: Joi.number().positive().required().messages({
    'any.required': 'El monto es obligatorio',
    'number.base': 'El monto debe ser un número',
    'number.positive': 'El monto debe ser mayor a 0'
  }),

  method: Joi.string().valid('cash', 'card', 'transfer').required().messages({
    'any.required': 'El método de pago es obligatorio',
    'any.only': 'El método de pago debe ser cash, card o transfer'
  }),

  description: Joi.string().allow('').optional(),

  status: Joi.string()
    .valid('pending', 'labor-payment', 'total-payment', 'partial-payment')
    .default('pending')
    .messages({
      'any.only': 'Estado inválido para el pago'
    })
});

/**
 * ============================================
 *   FUNCIÓN DE VALIDACIÓN
 * ============================================
 */

export const validatePayment = (payload) => {
  const { error, value } = paymentValidationSchema.validate(payload, {
    abortEarly: false
  });

  if (error) {
    return {
      ok: false,
      message: 'Error de validación en el pago',
      details: error.details.map((d) => d.message)
    };
  }

  return {
    ok: true,
    data: value
  };
};
