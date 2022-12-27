//TODO: JSONWEBTOKEN 작성하기.

const Joi = require('joi');

// 회원가입 JOI 검증
exports.registerSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.pattern.base': 'WRONG email PATTERN',
      'any.required': 'NO email INPUT',
    }),
  emailConfirm: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.pattern.base': 'WRONG email PATTERN',
      'any.required': 'NO email INPUT',
    }),
  password: Joi.string().min(4).max(20).required().messages({
    'string.empty': 'NO PW INPUT',
    'string.min': 'PW BELOW STRING LENGTH 4',
    'string.max': 'PW ABOVE STRING LENGTH 20',
    'any.required': 'NO PW INPUT',
  }),
  passwordConfirm: Joi.string().min(4).max(20).required().messages({
    'string.empty': 'NO PW INPUT',
    'string.min': 'PW BELOW STRING LENGTH 4',
    'string.max': 'PW ABOVE STRING LENGTH 20',
    'any.required': 'NO PW INPUT',
  }),
  firstName: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9가-힇]{4,15}$'))
    .required()
    .messages({
      'string.pattern.base': 'WRONG NICKNAME PATTERN',
      'any.required': 'NO NICKNAME INPUT',
    }),
  lastName: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9가-힇]{4,15}$'))
    .required()
    .messages({
      'string.pattern.base': 'WRONG NICKNAME PATTERN',
      'any.required': 'NO NICKNAME INPUT',
    }),
  country: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9가-힇]{1,15}$'))
    .required()
    .messages({
      'string.pattern.base': 'WRONG NICKNAME PATTERN',
      'any.required': 'NO NICKNAME INPUT',
    }),
});

// 로그인 JOI 검증
exports.loginSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.pattern.base': 'WRONG email PATTERN',
      'any.required': 'NO email INPUT',
    }),

  password: Joi.string().min(4).max(20).required().messages({
    'string.empty': 'NO PW INPUT',
    'string.min': 'PW BELOW STRING LENGTH 4',
    'string.max': 'PW ABOVE STRING LENGTH 20',
    'any.required': 'NO PW INPUT',
  }),
});
