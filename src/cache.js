import redis from 'redis'
import { promisify } from 'util'

const TTL = (60 * 30)

const client = redis.createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_AUTH
})

client.on('error', err => console.error(err))

const getFromRedis = promisify(client.get).bind(client)
const getCache = (key) =>
  getFromRedis(key)
    .then(JSON.parse)

const setCache = (key, value) => {
  client.set(key, JSON.stringify(value), 'EX', TTL)
  return value
}

export {
  getCache,
  setCache,
}
