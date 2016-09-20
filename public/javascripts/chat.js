$(function() {
  var socket = io();

  $(".messageForm").submit((event) => {
    event.preventDefault();
    let userMsg = $('.messageInput').val()

    socket.emit('send message', {
      message: userMsg
    });
    $('.messageInput').val("")
  });

  socket.on('send message', (message) => {
    $('.messages').append(`<li>${message.message}</li>`)
  });
});
