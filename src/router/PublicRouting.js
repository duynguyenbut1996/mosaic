import { PingRouter } from 'router/PingRouter.js'
import { UserRouter } from 'router/user/UserRouter.js'

const rootApi = ''

export const PublicRouting = [
  { root: rootApi, router: PingRouter },
  { root: rootApi, router: UserRouter }
]