const http = require('http');
const app = require('express')();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('连接成功');
    socket.on('disconnect', () => {
        console.log('连接断开');
    })
});

server.listen(3000, err => {
    if (err) throw err;
    console.log('server start : port * 3000');
});