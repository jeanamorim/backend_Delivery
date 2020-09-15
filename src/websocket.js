const socketio = require('socket.io');

let io;
const connections = [];

exports.setupWebSocket = server => {
  io = socketio(server);

  io.on('connection', socket => {
    connections.push({
      id: socket.id,
    });
  });
};

exports.sendMessage = (message, data) => {
  io.to(connections.id).emit(message, data);
};
