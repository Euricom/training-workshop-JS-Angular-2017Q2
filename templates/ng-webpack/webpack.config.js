module.exports = require('./config/webpack.dev.js');


const env = process.env.NODE_ENV || 'development'

function config () {
  switch (env) {
    case 'production':
    case 'prod':
      return 'prod'
    case 'development':
    case 'dev':
      return 'dev'

    default:
      throw new Error(`Invalid or unknow environment: ${env}`)
  }
}

module.exports = require(`./config/webpack.${config()}.js`)
