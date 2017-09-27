const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(process.env.port || 3000, function() {
  console.log('Listening for requests on port 3000');
});

app.use(express.static('public'));

let io = socket(server);

io.on('connection', function(socket) {
  console.log('made socket connection', socket.id);
  socket.on('color-change', function (data) {
    io.sockets.emit('color-change', data);
  });
});
