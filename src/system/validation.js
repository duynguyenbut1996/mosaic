import { InvalidParams } from 'domains/Exception'
import { Joi } from 'services/JoiValidation'
const util = require('util')
const _ = require('lodash')

const Validation = {
  validate: (schema, from = 'body') => {
    return (req, res, next) => {
      const payload = _.get(req, from, undefined) || req.body
      const result = Joi.validate(payload, schema, { allowUnknown: true })
      if (result.error) {
        if (result.error.isJoi) {
          const msg = result.error.details[0].message
          req.errorType = 'InvalidParams'
          throw new InvalidParams(msg)
        }
        throw result.error
      }
      req.body = result.value
      next()
    }
  },
  validateData: (schema, data) => {
    const result = Joi.validate(data, schema, { stripUnknown: true })
    if (result.error) {
      throw result.error
    }
    return result.value
  }
}

export default Validation
