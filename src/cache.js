import redis from 'redis'

const TTL = (60 * 30)

const client = redis.createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_AUTH
})

client.on('error', err => console.error(err))

export function getCache (key, value) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, result) => {
      if (err) {
        throw new Error(err)
      }
      if (result) {
        resolve(JSON.parse(result))
      } else {
        reject()
      }
    })
  })
}

export function setCache (key, value) {
  client.set(key, JSON.stringify(value), 'EX', TTL)
  return value
}
