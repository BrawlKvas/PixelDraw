let express = require('express');

let app = express();
app.use(express.static(__dirname));

let server = require('http').createServer(app);
server.listen(80);

let io = require('socket.io').listen(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let bd = [];

io.sockets.on('connection', (socket) => {
    io.sockets.emit('uploadToClient', {data: bd});

    socket.on('uploadToServer', (data) => {
        bd = data;
        io.sockets.emit('uploadToClient', {data: bd});
    });
});
