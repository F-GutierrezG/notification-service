const socket = io('http://localhost:5101', {
  query: {
    hash: '1234'
  }
});

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

subscribeToTimer((err, timestamp) => {
  console.log(timestamp)
});
