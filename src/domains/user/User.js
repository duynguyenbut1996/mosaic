import { Joi, JoiShortcuts } from 'services/JoiValidation'
const uuid = require('uuid/v4')

export const table = 'user'

export const schemaTable = (data) => {
  const { username, password, email, roles } = data
  return {
    id: uuid(),
    username,
    password,
    email,
    roles
  }
}

export const UserSchemaValidate = {
  username: JoiShortcuts.requiredString,
  password: JoiShortcuts.requiredString,
  email: JoiShortcuts.requiredString,
  roles: JoiShortcuts.optionalString
}