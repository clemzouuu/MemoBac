const Joi = require("joi");

// Schéma de validation pour la création d'un utilisateur
const createUserSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.empty": "Le nom d'utilisateur est obligatoire.",
      "string.min": "Le nom d'utilisateur doit contenir au moins 3 caractères.",
      "any.required": "Le nom d'utilisateur est requis."
    }),
  password: Joi.string()
    .min(6)
    .max(100)
    .required()
    .messages({
      "string.empty": "Le mot de passe est obligatoire.",
      "string.min": "Le mot de passe doit contenir au moins 6 caractères.",
      "any.required": "Le mot de passe est requis."
    })
});

// Schéma de validation pour la connexion d'un utilisateur
const loginUserSchema = Joi.object({
  username: Joi.string()
    .required()
    .messages({
      "string.empty": "Le nom d'utilisateur est obligatoire.",
      "any.required": "Le nom d'utilisateur est requis."
    }),
  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Le mot de passe est obligatoire.",
      "any.required": "Le mot de passe est requis."
    })
});

// Fonctions de validation qui renvoient le résultat de la validation
const validateCreateUser = (data) => {
  return createUserSchema.validate(data, { abortEarly: false });
};

const validateLoginUser = (data) => {
  return loginUserSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateCreateUser,
  validateLoginUser,
};
