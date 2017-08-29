import 'isomorphic-fetch'

import comunidades from '../data/comunidades.json'

const BASE_URL = 'https://api.meetup.com'
const API_KEY = process.env.MEETUP_API_KEY

export function listarEventos (comunidade) {
  const url = `${BASE_URL}/${comunidade}/events?key=${API_KEY}`
  return fetch(url).then(res => res.json())
}
