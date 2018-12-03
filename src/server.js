var express = require('express');

var app = express();

var serverPort = 5000;
var webSocketPort = 5001;

var server = require('http').Server(app)
  .listen(webSocketPort, function() {
    console.log("WebSocket listening on port %d", webSocketPort);
  });

var io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('connection', socket);
  socket.on('subscribeToTimer', (interval) => {
    console.log('socket is subscribing to timer with interval ', interval);
    setInterval(() => {
      socket.emit('timer', new Date());
    }, interval);
  });
});

app.post('/notifications/send', (req, res) => {
  console.log(req.body);
});

app.listen(serverPort, function() {
  console.log("Node server is listening on port %d", serverPort);
});
