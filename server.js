const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()
const authRouter = require('./auth/router')
const userRouter = require('./users/users-router')
const restricted = require('./auth/restricted')

server.use(express.json())
server.use(helmet())
server.use(cors())

server.get('/', (req, res) => {
  res.send(`<h1>Token Auth API</h1>`)
})

server.use('/api/auth', authRouter)
server.use('/api/users', restricted, userRouter)

module.exports = server
