const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const path = require('path')
require('./database/database')

const server = express()
server.use(cors())
server.use(express.json())
server.use('/files', express.static(path.resolve(__dirname, '..','uploads')))
server.use(routes)


server.listen(3333, ()=>console.log('running on 3333'))