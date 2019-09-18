let express = require('express');
let socket = require('socket.io');
let app = express();

appr.use("/", express.static(__dirname));

app.get('/', (req, res) => {
    res.send('./index.html');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});