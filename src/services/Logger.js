import * as winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

export const Logger = {
  info: (info) => {
    logger.info(info)
  },

  warn: (warn) => {
    logger.warn(warn)
  },

  error: (error) => {
    logger.error(error)
  },

  debug: (debug) => {
    logger.debug(debug)
  },

  debugToFile: (debug) => {
    logger.info(debug)
  },

  errorStackTrace: (error) => {
    console.log(error)
  }
}