const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')
require('./database/database')

const server = express()
const app = http.Server(server)
const io = socketio(app)

const connectedUsers = {}

io.on('connection', socket => {
    const { user_id } = socket.handshake.query
    connectedUsers[user_id] = socket.id
})
server.use((req,res,next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})

server.use(cors())
server.use(express.json())
server.use('/files', express.static(path.resolve(__dirname, '..','uploads')))
server.use(routes)


app.listen(3333, ()=>console.log('running on 3333'))