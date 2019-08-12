const dotenv = require('dotenv')
dotenv.config()

 const instance = require('knex')({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USERNAME,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    debug: true
  },
  migrations: {
    tableName: 'migrations'
  }
});

instance.raw('select 1+1 as result').catch(err => {
  process.exit(1);
});

export default instance
