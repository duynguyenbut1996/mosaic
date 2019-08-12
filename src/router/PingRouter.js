export const PingRouter = {
  handlers: {
    ping: (req) => {
      return 'PING API'
    },
  },

  fillRouter: (router, handlers) => {
    router.get('/ping', handlers.ping)
  }
}