const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  id: Joi.string().required(),
  name: Joi.string().required(),
  theme: Joi.string(),
  questions: Joi.array(),
})
