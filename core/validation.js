const Joi = require('joi');

const schema = {
  title: Joi.string()
    .min(4)
    .max(20)
    .required(),
  description: Joi.string()
    .min(20)
    .required(),
  author: Joi.number().integer()
};

module.exports = schema;
