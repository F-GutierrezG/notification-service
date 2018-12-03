var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')

var app = express();

app.use(cors())

var serverPort = 5000;
var webSocketPort = 5001;

var jsonParser = bodyParser.json()

app.use(jsonParser);

var server = require('http').Server(app)
  .listen(webSocketPort, function() {
    console.log("WebSocket listening on port %d", webSocketPort);
  });

var io = require('socket.io')(server);

io.on('connection', (socket) => {
  const hash = socket.handshake.query.hash;
  socket.join(hash);
  console.log('Connected to', hash);
});

require('./routes')(app, io);

app.listen(serverPort, function() {
  console.log("Node server is listening on port %d", serverPort);
});
