// backend/validation/profile.validation.js

export const validateIdParam = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      ok: false,
      message: 'El parámetro id es obligatorio'
    });
  }

  if (isNaN(Number(id))) {
    return res.status(400).json({
      ok: false,
      message: 'El id debe ser un número válido'
    });
  }

  next();
};

export const validateClientPayload = (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      ok: false,
      message: 'name, email y phone son obligatorios'
    });
  }

  next();
};

export const validateGuyPayload = (req, res, next) => {
  const { name, phone, skills, rating } = req.body;

  if (!name || !phone) {
    return res.status(400).json({
      ok: false,
      message: 'name y phone son obligatorios'
    });
  }

  if (skills && !Array.isArray(skills)) {
    return res.status(400).json({
      ok: false,
      message: 'skills debe ser un arreglo'
    });
  }

  if (rating && isNaN(Number(rating))) {
    return res.status(400).json({
      ok: false,
      message: 'rating debe ser numérico'
    });
  }

  next();
};

export const validateGuyPlusPayload = (req, res, next) => {
  const { name, phone, skills, rating, certifications, experience_years } = req.body;

  if (!name || !phone) {
    return res.status(400).json({
      ok: false,
      message: 'name y phone son obligatorios'
    });
  }

  if (skills && !Array.isArray(skills)) {
    return res.status(400).json({
      ok: false,
      message: 'skills debe ser un arreglo'
    });
  }

  if (certifications && !Array.isArray(certifications)) {
    return res.status(400).json({
      ok: false,
      message: 'certifications debe ser un arreglo'
    });
  }

  if (rating && isNaN(Number(rating))) {
    return res.status(400).json({
      ok: false,
      message: 'rating debe ser numérico'
    });
  }

  if (experience_years && isNaN(Number(experience_years))) {
    return res.status(400).json({
      ok: false,
      message: 'experience_years debe ser numérico'
    });
  }

  next();
};
