let express = require('express');
let fs = require('fs');

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
    io.sockets.emit('uploadToClient', { data: bd });

    socket.on('uploadToServer', (data) => {
        bd = data;
        io.sockets.emit('uploadToClient', { data: bd });
    });

    socket.on('adminCommand', (data) => {
        if (data.slice(0, 5) == 'save ') {
            saveBd(data.slice(5));
        } else if (data.slice(0, 5) == 'load ') {
            loadBd(data.slice(5));
        } else if (data == 'cls bd') {
            bd = [];
            io.sockets.emit('uploadToClient', { data: bd });
        } else if (data == 'length bd') {
            console.log(bd.length);
        } else if (data == 'cls') {
            console.clear();
        }
    });
});

function saveBd(nameFile) {
    fs.writeFile(nameFile, JSON.stringify(bd), (err, data) => { });
}

function loadBd(nameFile) {
    fs.readFile(nameFile, 'utf8', (err, data) => {
        try {
            bd = JSON.parse(data);
            io.sockets.emit('uploadToClient', { data: bd });
        } catch (e) {
            //
        }
    });
}
