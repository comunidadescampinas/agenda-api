import Koa from 'koa'
import Router from 'koa-router'

import { listarEventosTodasComunidades } from './lib'

const PORT = process.env.PORT || 3001

const app = new Koa()
const router = new Router()

router.get('/eventos', async (ctx, next) => {
  ctx.body = await listarEventosTodasComunidades('Nodeschool-Campinas')
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT)
