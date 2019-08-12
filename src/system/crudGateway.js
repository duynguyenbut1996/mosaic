import knex from 'domains/database.js'

const crudGateway = {
  insert: (table, schema) => {
    const user = knex(table).insert(schema)
    user.save()
    console.log('user', user)
  }
}

export default crudGateway
