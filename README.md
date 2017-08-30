# Comunidades Campinas API

[![Travis Build][travis-image]][travis-url]

API para agregação de calendários das comunidades de Campinas, online em [comunidades-campinas.herokuapp.com/eventos](https://comunidades-campinas.herokuapp.com/eventos).

O frontend está no repositório [agenda-front](https://github.com/comunidadescampinas/agenda-front) e está publicado no endereço [comunidades-campinas.surge.sh](https://comunidades-campinas.surge.sh/).

[travis-url]: https://travis-ci.org/comunidadescampinas/agenda-api
[travis-image]: https://api.travis-ci.org/comunidadescampinas/agenda-api.svg

## Colaborando

Para executar a API você deve definir as seguintes variáveis de ambiente primeiro:

* MEETUP_API_KEY: a sua API key do Meetup.com
* REDIS_URL: connection string para a instância de Redis usada para cache
* REDIS_AUTH: senha de conexão à instância de Redis usada para cache

Depois disto, basta executar `npm install` e `npm start`.
