import 'isomorphic-fetch'
import { normalize, schema } from 'normalizr'

import { getCache, setCache } from './cache'

import comunidades from '../data/comunidades.json'

const BASE_URL = 'https://api.meetup.com'
const API_KEY = process.env.MEETUP_API_KEY

const group = new schema.Entity('comunidades')

const venue = new schema.Entity('locais')

const event = new schema.Entity('eventos', {
  group: group,
  venue: venue
})

const mapToJson = res => res.json()
const normalizeEvents = res => normalize(res, [event])

const getUrlEventos = comunidade =>
  `${BASE_URL}/${comunidade}/events?key=${API_KEY}`

function mergeEntities (entityName, acc, n) {
  const a = acc ? acc.entities[entityName] : {}
  const b = n ? n.entities[entityName] : {}
  return Object.assign({}, a, b)
}

const listarEventos = (comunidade) =>
  getCache(comunidade)
    .catch( () =>
      fetch(getUrlEventos(comunidade))
        .then( res => (res.status === 200) ?
          res
          : Promise.reject(`${res.status} ${res.statusText}`)
        )
        .then(mapToJson)
        .then(normalizeEvents)
        .then(res => setCache(comunidade, res))
    )

export const listarEventosTodasComunidades = () =>
  Promise.all(comunidades.map(listarEventos))
    .then(res =>
      res
        .filter(i => !!i)
        .reduce( (todos, atual) => ({
          entities: {
            comunidades: mergeEntities('comunidades', todos, atual),
            locais: mergeEntities('locais', todos, atual),
            eventos: mergeEntities('eventos', todos, atual)
          },
          result: todos.result.concat(atual.result)
        }) )
    )
    .catch( err => { throw new Error(err) })
