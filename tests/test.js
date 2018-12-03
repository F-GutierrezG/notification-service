const socket = io('https://stage.onelike.gusisoft.cl/notifications-sockets', {
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
