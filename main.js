const ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'development')
  require('dotenv').config()

require('babel-polyfill')
require('babel-core/register')
require('./src/server.js')
