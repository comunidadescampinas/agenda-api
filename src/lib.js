import 'isomorphic-fetch'
import { normalize, schema } from 'normalizr'

import comunidades from '../data/comunidades.json'

const BASE_URL = 'https://api.meetup.com'
const API_KEY = process.env.MEETUP_API_KEY

const group = new schema.Entity('groups')

const venue = new schema.Entity('venues')

const event = new schema.Entity('events', {
  group: group,
  venue: venue
})

const mapToJson = res => res.json()
const normalizeEvents = res => normalize(res, [event])

export function listarEventos (comunidade) {
  const url = `${BASE_URL}/${comunidade}/events?key=${API_KEY}`
  return fetch(url).then(mapToJson).then(normalizeEvents)
}
