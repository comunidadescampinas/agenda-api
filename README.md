> Projeto descontinuado pois muitas comunidades saíram do Meetup após ele se tornar pago para organizadores.

# Comunidades Campinas API

[![Travis Build][travis-image]][travis-url]

[travis-url]: https://travis-ci.org/comunidadescampinas/agenda-api
[travis-image]: https://api.travis-ci.org/comunidadescampinas/agenda-api.svg

API para agregação de calendários das comunidades de Campinas, online em [agendatechrmc.herokuapp.com/eventos](https://agendatechrmc.herokuapp.com/eventos).

O frontend está no repositório [agenda-front](https://github.com/comunidadescampinas/agenda-front) e está publicado no endereço [agendatechrmc.surge.sh](https://agendatechrmc.surge.sh/).

## Como inserir sua comunidade na lista?

Faça um git pull request com o arquivo `data/comunidades.json` alterado (https://github.com/comunidadescampinas/agenda-api/blob/master/data/comunidades.json) listando o nome de sua comunidade no Meetup.com.
 
Dúvidas? Pergunte diretamente ao `@victorperin` (https://github.com/victorperin).

## Como colaborar com o código desta API?

Para executar a API você deve definir as seguintes variáveis de ambiente primeiro:

* MEETUP_API_KEY: a sua API key do Meetup.com
* REDIS_URL: connection string para a instância de Redis usada para cache
* REDIS_AUTH: senha de conexão à instância de Redis usada para cache

Depois disto, basta executar `npm run dev`.

Caso queira subir a stack em `Docker`, basta rodar do comando `docker-compose up` na raiz do projeto. 
Por default o servidor de desenvolvimento irá subir em `http://localhost:3001`. 
A stack do projeto já irá suprir as dependências e subir serviços como `Redis`. 
Dentro do `docker-compose.yml` informe sua API do Meetup na key `MEETUP_API_KEY=xxxxxxxxxxxxxxx`.
