// backend/validation/jobs.initial.validation.js

import Joi from 'joi';

/**
 * ============================================
 *   VALIDACIÓN: FOTOS INICIALES DEL CLIENTE
 * ============================================
 */
export const initialPhotosValidationSchema = Joi.object({
  jobId: Joi.string().required().messages({
    'any.required': 'El jobId es obligatorio'
  }),

  files: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required().messages({
          'any.required': 'La URL de la foto es obligatoria',
          'string.uri': 'La URL de la foto no es válida'
        }),
        filename: Joi.string().min(1).required().messages({
          'any.required': 'El nombre del archivo es obligatorio',
          'string.empty': 'El nombre del archivo no puede estar vacío'
        })
      })
    )
    .min(1)
    .required()
    .messages({
      'any.required': 'Debe subir al menos una foto',
      'array.min': 'Debe subir al menos una foto'
    })
});

/**
 * ============================================
 *   VALIDACIÓN: NOTAS INICIALES DEL CLIENTE
 * ============================================
 */
export const initialNotesValidationSchema = Joi.object({
  jobId: Joi.string().required().messages({
    'any.required': 'El jobId es obligatorio'
  }),

  notes: Joi.string()
    .min(1)
    .required()
    .messages({
      'any.required': 'Las notas son obligatorias',
      'string.empty': 'Las notas no pueden estar vacías',
      'string.min': 'Las notas deben contener al menos 1 caracter'
    })
});

/**
 * ============================================
 *   FUNCIÓN GENERAL DE VALIDACIÓN
 * ============================================
 */
export const validateInitialData = (schema, payload) => {
  const { error, value } = schema.validate(payload, { abortEarly: false });

  if (error) {
    return {
      ok: false,
      message: 'Error de validación en datos iniciales',
      details: error.details.map((d) => d.message)
    };
  }

  return {
    ok: true,
    data: value
  };
};
