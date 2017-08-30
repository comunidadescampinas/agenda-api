import Koa from 'koa'
import Router from 'koa-router'
import cors from 'kcors'

import { listarEventosTodasComunidades } from './lib'

const PORT = process.env.PORT || 3001

const app = new Koa()
const router = new Router()

async function wrapResponse (fn) {
  try {
    return {
      status: 'success',
      body: await fn()
    }
  } catch (err) {
    return {
      status: 'error',
      message: err.message
    }
  }
}

router.get('/eventos', async (ctx, next) => {
  ctx.body = await wrapResponse(listarEventosTodasComunidades)
})

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT)
