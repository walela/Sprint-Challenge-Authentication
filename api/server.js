const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const authenticate = require('../auth/authenticate-middleware.js')
const authRouter = require('../auth/auth-router.js')
const jokesRouter = require('../jokes/jokes-router.js')

const server = express()

server.use(morgan('dev'))
server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api/auth', authRouter)
server.use('/api/jokes', authenticate, jokesRouter)

server.get('/', (_, res) => {
  res.status(200).json({ message: 'API is up!' })
})

server.all('*', (_, res) => {
  res.sendStatus(404)
})

module.exports = server
