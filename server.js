let workFiles = require('./workFiles');

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
let bgc = '#000000';

io.sockets.on('connection', (socket) => {
    io.sockets.emit('uploadToClient', { data: bd });

    socket.on('addPixel', (data) => {
        addPixel(data);
        io.sockets.emit('uploadToClient', { data: bd });
    });

    socket.on('adminCommand', (data) => {
        if (data.slice(0, 5) == 'save ') {
            workFiles.save(data.slice(5), bd);
        } else if (data.slice(0, 5) == 'load ') {
            bd = workFiles.load(data.slice(5));
            io.sockets.emit('uploadToClient', { data: bd });
        } else if (data == 'cls bd') {
            bd = [];
            io.sockets.emit('uploadToClient', { dsata: bd });
        } else if (data == 'length bd') {
            console.log(bd.length);
        } else if (data == 'cls') {
            console.clear();
        }
    });
});

function addPixel(pixel) {
    bd = bd.filter(item => {
        return !(item.x == pixel.x && item.y == pixel.y);
    });

    if (pixel.color != '#000000') bd.push(pixel);
}


