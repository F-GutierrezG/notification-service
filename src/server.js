var express = require('express');

var app = express();

var serverPort = 5000;
var webSocketPort = 5001;

var server = require('http').Server(app)
  .listen(webSocketPort, function() {
    console.log("WebSocket listening on port %d", webSocketPort);
  });

var io = require('socket.io')(server);

io.on('connection', (client) => {
  console.log('connection', client);
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
});

app.post('/notifications', (req, res) => {

});

app.listen(serverPort, function() {
  console.log("Node server is listening on port %d", serverPort);
});
