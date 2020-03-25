const server = require('./server')

const PORT = process.env.DB_PORT || 4000

server.listen(PORT, () => {
  console.log(`\n** Listening on PORT ${PORT} **\n`)
})