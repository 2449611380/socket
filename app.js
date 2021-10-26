const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

server.listen(3000, err => {
    console.log('server start : port * 3000');
});

let players = {};

class Player {
    constructor(id, name = '无名小卒', x, y) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
    };
};

io.on('connection', (socket) => {
    socket.emit('first_data', players);

    socket.on('add_player', data => {
        data.id = socket.id;
        players[socket.id] = new Player(socket.id, data.name, data.x, data.y);
        io.emit('add_player', players[socket.id]);
    })

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('leave_player', socket.id);
    })
});