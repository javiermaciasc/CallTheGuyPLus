// backend/validation/stores.validation.js

import Joi from 'joi';

/**
 * ============================================
 *   VALIDACIÓN: TIENDA (GRANDES PROVEEDORES)
 * ============================================
 */
export const storeValidationSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'any.required': 'El nombre de la tienda es obligatorio',
    'string.empty': 'El nombre no puede estar vacío',
    'string.min': 'El nombre debe tener al menos 2 caracteres',
    'string.max': 'El nombre no puede exceder 100 caracteres'
  }),

  address: Joi.string().min(5).max(200).required().messages({
    'any.required': 'La dirección es obligatoria',
    'string.empty': 'La dirección no puede estar vacía',
    'string.min': 'La dirección debe tener al menos 5 caracteres',
    'string.max': 'La dirección no puede exceder 200 caracteres'
  }),

  phone: Joi.string().min(7).max(20).optional(),

  email: Joi.string().email().optional()
});

/**
 * ============================================
 *   VALIDACIÓN: PRODUCTO DE TIENDA
 * ============================================
 */
export const storeProductValidationSchema = Joi.object({
  store: Joi.string().required().messages({
    'any.required': 'La tienda es obligatoria'
  }),

  sku: Joi.string().min(2).max(50).required().messages({
    'any.required': 'El SKU es obligatorio',
    'string.min': 'El SKU debe tener al menos 2 caracteres',
    'string.max': 'El SKU no puede exceder 50 caracteres'
  }),

  name: Joi.string().min(2).max(150).required().messages({
    'any.required': 'El nombre del producto es obligatorio',
    'string.min': 'El nombre debe tener al menos 2 caracteres',
    'string.max': 'El nombre no puede exceder 150 caracteres'
  }),

  price: Joi.number().positive().required().messages({
    'any.required': 'El precio es obligatorio',
    'number.base': 'El precio debe ser un número',
    'number.positive': 'El precio debe ser mayor a 0'
  }),

  url: Joi.string().uri().optional(),

  category: Joi.string().min(2).max(100).optional(),

  image: Joi.string().uri().optional()
});

/**
 * ============================================
 *   VALIDACIÓN: ORDEN DE TIENDA (MATERIALES)
 * ============================================
 */
export const storeOrderValidationSchema = Joi.object({
  store: Joi.string().required().messages({
    'any.required': 'La tienda es obligatoria'
  }),

  items: Joi.array()
    .items(
      Joi.object({
        sku: Joi.string().required().messages({
          'any.required': 'El SKU del material es obligatorio'
        }),
        qty: Joi.number().integer().positive().required().messages({
          'any.required': 'La cantidad es obligatoria',
          'number.base': 'La cantidad debe ser un número',
          'number.positive': 'La cantidad debe ser mayor a 0'
        })
      })
    )
    .min(1)
    .required()
    .messages({
      'any.required': 'Debe incluir al menos un material',
      'array.min': 'Debe incluir al menos un material'
    }),

  notes: Joi.string().allow('').optional(),

  status: Joi.string()
    .valid('pending', 'ordered', 'delivered', 'cancelled')
    .default('pending')
});

/**
 * ============================================
 *   FUNCIÓN GENERAL DE VALIDACIÓN
 * ============================================
 */
export const validateStore = (schema, payload) => {
  const { error, value } = schema.validate(payload, { abortEarly: false });

  if (error) {
    return {
      ok: false,
      message: 'Error de validación en módulo de tiendas',
      details: error.details.map((d) => d.message)
    };
  }

  return {
    ok: true,
    data: value
  };
};
