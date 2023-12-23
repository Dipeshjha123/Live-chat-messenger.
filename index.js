const io = require('socket.io')(8000);

const users = {};

io.on('connection', socket => {
  socket.on('new-user-joined', name => {
    console.log("New User", name);
    users[socket.id] = name;
    io.emit('user-joined', name); // Change to io.emit to send to all connected sockets.
  });

  socket.on('send', message => {
    io.emit('receive', { message: message, name: users[socket.id] }); // Change to io.emit to send to all connected sockets.
  });

  socket.on('disconnect', () => { // Corrected the 'disconnect' event handler placement and removed 'message' parameter.
    io.emit('left', users[socket.id]);
    delete users[socket.id];
  });
});
