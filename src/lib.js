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

function getUrlEventos (comunidade) {
  return `${BASE_URL}/${comunidade}/events?key=${API_KEY}`
}

function mergeEntities (entityName, acc, n) {
  const a = acc ? acc.entities[entityName] : {}
  const b = n ? n.entities[entityName] : {}
  return Object.assign({}, a, b)
}

function listarEventos (comunidade) {
  return getCache(comunidade).then(cached => {
    return cached
  }, () => {
    const url = getUrlEventos(comunidade)
    return fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res
      } else {
        throw new Error(`${res.status} ${res.statusText}`)
      }
    })
    .then(mapToJson)
    .then(normalizeEvents)
    .then(res => setCache(comunidade, res))
  })
}

export function listarEventosTodasComunidades () {
  const empty = {
    entities: {
      comunidades: {},
      locais: {},
      eventos: {}
    },
    result: []
  }
  const todasComunidades = comunidades.map(listarEventos)
  return Promise.all(todasComunidades).then(res => {
    return res
    .filter(i => !!i)
    .reduce((todos, atual, empty) => {
      return {
        entities: {
          comunidades: mergeEntities('comunidades', todos, atual),
          locais: mergeEntities('locais', todos, atual),
          eventos: mergeEntities('eventos', todos, atual)
        },
        result: todos.result.concat(atual.result)
      }
    })
  }, err => {
    throw new Error(err)
  })
}
