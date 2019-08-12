import ServerRestful from './server'
import Initializer from './system/initialize'
import { PublicRouting } from 'router/PublicRouting.js'
import { Logger } from 'services/Logger'

const dotenv = require('dotenv')
const _ = require('lodash')
dotenv.config()

Initializer().then((res) => {
  const server = new ServerRestful(PublicRouting)
  server.runServer()
  Logger.info(res)
})
