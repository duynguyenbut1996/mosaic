const express = require('express')
const bodyParser = require('body-parser')
// const Raven = require('raven');
const auth = require('basic-auth')
import { Logger } from 'services/Logger'
const _ = require('lodash')

export default class ServerRestful {
  constructor(router) {
    this.server = express()
    this.router = express.Router()
    this.publicRouter = router
  }

  runServer() {
    this.server.use(bodyParser.urlencoded({ extended: false }))
    this.server.use(bodyParser.json())

    // this.server.use(this._tryToValidateAuthenticate)
    this.publicRouter.forEach(({ root, router }) => {
      router.fillRouter(this.router, this. _getHandlers(router))
      this.server.use(root, this.router)
    })

    this.server.use(this._errorHandler)

    this.server.listen(process.env.SERVER_PORT, 
      () => console.log(`server start with port ${process.env.SERVER_PORT}`))
  }

  _errorHandler (err, req, res, next) {
    const statusCode = err.statusCode || 500
    let errorMessage = ''
    const metaData = err.metaData || null

    if (req.errorType === 'InvalidParams') { // invalid body request
      errorMessage = err.message
    } else if (statusCode === 500) {
      errorMessage = _.get(err, 'response.data', undefined) || err.message
      Logger.errorStackTrace(err)
    } else {
      const key = err.message.replace(/:/g, '%3A')
      errorMessage = req.t(key)
    }

    const response = {
      errorCode: err.message,
      msg: errorMessage,
      statusCode: statusCode,
      metaData: metaData
    }

    const errToLog = err
    if (errToLog.metaData) delete errToLog.metaData
    Logger.error(errToLog)

    res.status(statusCode).json(response)
    next()
  }

  _getHandlers (router) {
    const handlers = router.handlers
    Object.keys(handlers).forEach((key) => {
      const fn = handlers[key]
      handlers[key] = (req, res) => res.json(fn(req, res))
    })
    return handlers
  }

  _tryToValidateAuthenticate (req, res, next) {
    try {
      _tryToAuthorize(req)
    } catch (error) {
      console.log('error', error)
      req.authError = error
    }
    next()
  }
}

function _tryToAuthorize (req) {
  const authorization = auth(req)
  console.log('authorization', authorization)
  if (!authorization) throw new Unauthorization('error.authorization.unauthorized')
  _.set(req, 'currentRequester.rovoProfileId', authorization.pass)

  // const superAdmin = _getSuperAdminFromAuthorizationHeader(authorization)
  // if (superAdmin) {
  //   _.set(req, 'currentRequester.superAdmin', superAdmin)
  //   contextService.set('rovo:superAdmin', superAdmin)
  //   return
  // }

  // _authorizedByRovoProfileId(req, authorization)
}