module.exports = {
  app: {
    name: 'base-api',
    locale: 'pt_BR',
    timezone: 'America/Sao_Paulo'
  },
  server: {
    cors: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    }
  }
}