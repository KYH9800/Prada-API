//TODO: JSONWEBTOKEN 작성하기.


const Joi = require('joi');

// 회원가입 JOI 검증
exports.registerSchema = Joi.object().keys({
  account: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,15}$'))
    .required()
    .messages({
      'string.pattern.base': 'WRONG ID PATTERN',
      'any.required': 'NO ID INPUT',
    }),
  nickname: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9각-힣]{3,15}$'))
    .required()
    .messages({
      'string.pattern.base': 'WRONG NICKNAME PATTERN',
      'any.required': 'NO NICKNAME INPUT',
    }),
  password: Joi.string().min(4).max(20).required().messages({
    'string.empty': 'NO PW INPUT',
    'string.min': 'PW BELOW STRING LENGTH 4',
    'string.max': 'PW ABOVE STRING LENGTH 20',
    'any.required': 'NO PW INPUT',
  }),
  confirm: Joi.valid(Joi.ref('password')).required().messages({
    'string.empty': 'NO PW CONFIRM INPUT',
    'any.required': 'NO PW CONFIRM INPUT',
    'any.only': 'PW CONFIRM DOES NOT MATCH',
  }),
});

// 로그인 JOI 검증
exports.loginSchema = Joi.object().keys({
  account: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,15}$'))
    .required()
    .messages({
      'string.pattern.base': 'WRONG ID PATTERN',
      'any.required': 'NO ID INPUT',
    }),

  password: Joi.string().min(4).max(20).required().messages({
    'string.empty': 'NO PW INPUT',
    'string.min': 'PW BELOW STRING LENGTH 4',
    'string.max': 'PW ABOVE STRING LENGTH 20',
    'any.required': 'NO PW INPUT',
  }),
});
