// backend/validation/guyplus.validation.js

import Joi from 'joi';

/**
 * ============================================
 *   VALIDACIÓN: VENDOR (GUY PLUS)
 * ============================================
 */
export const vendorValidationSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'any.required': 'El nombre del vendor es obligatorio',
    'string.empty': 'El nombre no puede estar vacío',
    'string.min': 'El nombre debe tener al menos 2 caracteres',
    'string.max': 'El nombre no puede exceder 100 caracteres'
  }),

  email: Joi.string().email().required().messages({
    'any.required': 'El email del vendor es obligatorio',
    'string.email': 'El email debe ser válido'
  }),

  phone: Joi.string().min(7).max(20).required().messages({
    'any.required': 'El teléfono del vendor es obligatorio',
    'string.empty': 'El teléfono no puede estar vacío',
    'string.min': 'El teléfono debe tener al menos 7 caracteres',
    'string.max': 'El teléfono no puede exceder 20 caracteres'
  }),

  active: Joi.boolean().default(true)
});

/**
 * ============================================
 *   VALIDACIÓN: ORDEN DE VENDOR (GUY PLUS)
 * ============================================
 */
export const vendorOrderValidationSchema = Joi.object({
  vendorId: Joi.string().uuid().required().messages({
    'any.required': 'El vendorId es obligatorio',
    'string.guid': 'El vendorId debe ser un UUID válido'
  }),

  title: Joi.string().min(3).max(150).required().messages({
    'any.required': 'El título es obligatorio',
    'string.min': 'El título debe tener al menos 3 caracteres',
    'string.max': 'El título no puede exceder 150 caracteres'
  }),

  description: Joi.string().allow('').optional(),

  status: Joi.string()
    .valid('open', 'in-progress', 'completed', 'cancelled')
    .default('open')
});

/**
 * ============================================
 *   VALIDACIÓN: BENEFICIO DE VENDOR (GUY PLUS)
 * ============================================
 */
export const vendorBenefitValidationSchema = Joi.object({
  vendorId: Joi.string().uuid().required().messages({
    'any.required': 'El vendorId es obligatorio',
    'string.guid': 'El vendorId debe ser un UUID válido'
  }),

  title: Joi.string().min(3).max(150).required().messages({
    'any.required': 'El título del beneficio es obligatorio',
    'string.min': 'El título debe tener al menos 3 caracteres',
    'string.max': 'El título no puede exceder 150 caracteres'
  }),

  description: Joi.string().allow('').optional(),

  active: Joi.boolean().default(true)
});

/**
 * ============================================
 *   VALIDACIÓN: PAGO A VENDOR (GUY PLUS)
 * ============================================
 */
export const vendorPaymentValidationSchema = Joi.object({
  vendorId: Joi.string().uuid().required().messages({
    'any.required': 'El vendorId es obligatorio',
    'string.guid': 'El vendorId debe ser un UUID válido'
  }),

  amount: Joi.number().positive().required().messages({
    'any.required': 'El monto es obligatorio',
    'number.base': 'El monto debe ser un número',
    'number.positive': 'El monto debe ser mayor a 0'
  }),

  method: Joi.string().valid('cash', 'card', 'transfer').required().messages({
    'any.required': 'El método de pago es obligatorio',
    'any.only': 'El método debe ser cash, card o transfer'
  }),

  description: Joi.string().allow('').optional(),

  status: Joi.string()
    .valid('pending', 'approved', 'rejected')
    .default('pending')
});

/**
 * ============================================
 *   FUNCIÓN GENERAL DE VALIDACIÓN
 * ============================================
 */
export const validateGuyPlus = (schema, payload) => {
  const { error, value } = schema.validate(payload, { abortEarly: false });

  if (error) {
    return {
      ok: false,
      message: 'Error de validación en GuyPlus',
      details: error.details.map((d) => d.message)
    };
  }

  return {
    ok: true,
    data: value
  };
};
