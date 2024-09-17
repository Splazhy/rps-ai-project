// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Create or join a room
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`);
    io.to(room).emit('roomJoined', `${socket.id} has joined the room`);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log('Socket.IO server running on port 3001');
});
