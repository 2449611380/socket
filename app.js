const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(__dirname + '/public/'))

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

let Player_status = [];

io.on('connection', (socket) => {
    let key = '';
    socket.on('disconnect', () => {
        console.log('连接断开');
        Player_status = Player_status.splice(key, key);
    });

    socket.on('player_data', data => {
        Player_status.push(data);
        key = Player_status.length - 1;

        setInterval(() => {
            socket.emit('AllPlayerStatusReturn', { key, Player_status });
        }, 1000 / 120);
    });
});

server.listen(3000, err => {
    if (err) throw err;
    console.log('server start : port * 3000');
});