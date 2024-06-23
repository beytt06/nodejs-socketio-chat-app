const express = require('express')
const socket = require('socket.io')
const cors = require('cors');

const app = express()
const server = app.listen(3000)

app.use(express.static('public'))

const io = socket(server, {
    cors: {
      origin: '*', 
      methods: ["GET", "POST"]
    }
  });

io.on('connection', (socket) => {
    console.log(socket.id)

    socket.on('chat', data => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing' , data => {
        socket.broadcast.emit('typing', data)
    })

})

