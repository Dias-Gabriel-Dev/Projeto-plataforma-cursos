const Joi = require('joi');

// Esquema de validação para criar um novo usuário
const validaUsuario = Joi.object({
  nome: Joi.string().min(3).max(30).required().messages({
    'string.min': 'O nome deve ter pelo menos 3 caracteres.',
    'string.max': 'O nome deve ter no máximo 30 caracteres.',
    'any.required': 'O nome é obrigatório.',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'O e-mail deve ser válido.',
    'any.required': 'O e-mail é obrigatório.',
  }),
  cpf: Joi.string().length(11).required().messages({
    'string.length': 'O CPF deve ter exatamente 11 caracteres.',
    'any.required': 'O CPF é obrigatório.',
  }),
});

module.exports = {
  validaUsuario,
};