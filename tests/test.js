const socket = io('http://localhost:5101', {
  query: {
    hash: '1234'
  }
});

function subscribeToTimer(cb) {
  socket.on('notification', timestamp => cb(null, timestamp));
}

subscribeToTimer((err, timestamp) => {
  console.log(timestamp)
});
