class Exception extends Error {
  constructor (statusCode, msg, metaData) {
    super(msg)
    this.statusCode = statusCode
    this.metaData = metaData
  }
}

export class InvalidParams extends Exception {
  constructor (msg, metaData) {
    super(400, msg, metaData)
  }
}
export class JoiInvalidParams extends InvalidParams {}

export class Unauthorization extends Exception {
  constructor (msg, metaData) {
    super(401, msg, metaData)
  }
}

export class Forbidden extends Exception {
  constructor (msg, metaData) {
    super(403, msg, metaData)
  }
}

export class BadRequest extends Exception {
  constructor (msg, metaData) {
    super(400, msg, metaData)
  }
}

export class ServiceUnavailable extends Exception {
  constructor (msg, metaData) {
    super(503, msg, metaData)
  }
}

export class NotFound extends Exception {
  constructor (msg, metaData) {
    super(404, msg, metaData)
  }
}
