const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);
    socket.on('chat message', (msg) => {
        console.log('Message received from ' + socket.id + ': ' + msg);
        io.emit('chat message', msg); // Broadcast the message to all connected clients
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected: ' + socket.id);
    });
});

server.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});