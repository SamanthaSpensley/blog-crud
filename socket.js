var io = require('socket.io')();

io.on('connection', function(socket) {
  console.log("someone entered the chat room!");

  socket.on('send message', function(message) {
    io.emit('send message', message);
  });

});

module.exports = io;
