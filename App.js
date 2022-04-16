const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const middleware = require('./middleware')
const routes = require('./router')
require('dotenv').config()

const server = express()

server.use(express.json())
server.use(cors())
server.use(fileUpload({}))

server.use('/', routes.authRouter)
server.use('/users', middleware.checkAccess, routes.usersRouter)
server.use('/points', routes.housesRouter)

server.all('*', (req, res) => res.status(404).end('Invalid path'))

const port = process.env.PORT
server.listen(port, () => {
  console.log(port)
})
