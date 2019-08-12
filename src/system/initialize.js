const dotenv = require('dotenv')
const _ = require('lodash')
dotenv.config()

export default function Initializer() {
  return new Promise((resolve, reject) => {
    resolve('CONNECTED DATABASE')
  })
}
