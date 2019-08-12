export const Joi = require('joi').extend((joi) => ({
  name: 'array',
  base: joi.array().items(),
  language: {
    matchAll: 'all items of array must be matched'
  },

  coerce (value, state, options) {
    this._flags.originArrayLength = value ? value.length : 0
    return value
  },

  rules: [
    {
      name: 'matchAll',
      description (params) {
        return 'All items of arrays must be matched the schemas'
      },
      setup (params) {},
      validate (params, value, state, options) {
        if (this._flags.originArrayLength === 0) return value
        if (value.length !== this._flags.originArrayLength) {
          return this.createError('array.matchAll', {}, state, options)
        }
        return value
      }
    }
  ]
})).extend((joi) => ({
  name: 'any',
  base: joi.any(),
  language: {
    string: 'must be a string'
  },
  rules: [
    {
      name: 'optionalString',
      setup (params) {},
      validate (params, value, state, options) {
        if (typeof value === 'string' || value === null) { return value }
        return this.createError('any.string', { value }, state, options)
      }
    },
    {
      name: 'replace',
      params: {
        oldValues: joi.array().items(joi.any()).required(),
        newValue: joi.any().required()
      },
      setup (params) {},
      validate (params, value, state, options) {
        if (params.oldValues.indexOf(value) > -1) return params.newValue
        return value
      }
    }
  ]
})
).extend(require('joi-date-extensions'))

const defaultDateTimeFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ'
const _optionalStringRule = Joi.any().optionalString().replace([''], null)
export const JoiShortcuts = {
  optionalUuid: Joi.string().guid().empty('').default(null).allow(null),
  optionalNumber: Joi.number().empty('').default(null).allow(null),
  optionalBoolean: Joi.bool().empty('').default(null).allow(null),
  optionalString: _optionalStringRule,
  optionalColor: Joi.string().regex(/^#[A-Fa-f0-9]{3}/).empty('').default(null).allow(null),
  optionalUrl: Joi.string().uri({ scheme: ['http', 'https'] }).empty('').default(null).allow(null),
  optionalEmail: Joi.string().email().empty('').default(null).allow(null),
  optionalRovoProfileId: Joi.alternatives().try(
    _optionalStringRule,
    Joi.number().integer()
  ).allow(null),
  optionalDate: (inputFormat = defaultDateTimeFormat) => {
    return Joi.date().utc().format(inputFormat).empty('').default(null).allow(null)
  },
  optionalType: (validValues) => {
    return Joi.string().valid(validValues).empty('').default(null).allow(null)
  },
  requiredType: (validValues) => {
    return Joi.string().valid(validValues).required()
  },
  requiredHour: Joi.number().integer().min(1).max(23).required(),
  requiredMinute: Joi.number().integer().min(0).max(59).required(),
  requiredDatetime: (inputFormat = defaultDateTimeFormat) => {
    return Joi.date().utc().format(inputFormat).required()
  },
  requiredUuid: Joi.string().guid().required(),
  requiredString: Joi.string().required(),
  requiredNumber: Joi.number().required(),
  requiredBoolean: Joi.bool().required(),
  requiredEmail: Joi.string().email().required(),
  requiredRovoProfileId: Joi.alternatives().try(
    _optionalStringRule,
    Joi.number().integer()
  ).required()
}
