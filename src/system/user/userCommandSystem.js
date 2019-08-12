import knex from 'domains/database.js'
import crudGateway from 'system/crudGateway.js'
import { table, schemaTable } from 'domains/user/User.js'
import { Responder } from 'system/responder.js'

const userSystem = {
  register: async (userData) => {
    const data = await crudGateway.insert(table, schemaTable(userData))
    return Responder.object(data)
  }
}

export default userSystem