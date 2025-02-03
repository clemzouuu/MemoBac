const Joi = require("joi");

// Validation pour la création d'une carte
const createCardValidation = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
  tag: Joi.string().required(),
}).options({ abortEarly: false });

// Validation pour répondre à une question
const answerCardValidation = Joi.object({
  isValid: Joi.boolean().required(),
}).options({ abortEarly: false });

module.exports = { createCardValidation, answerCardValidation };
