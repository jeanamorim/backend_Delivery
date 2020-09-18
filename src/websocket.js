const socketio = require('socket.io');

let io;
const connections = {};

exports.setupWebSocket = server => {
  io = socketio(server);

  io.on('connection', socket => {
    const { profile_id } = socket.handshake.query;
    connections[profile_id] = socket.id;
  });
};

exports.connectionsId = () => {
  return connections;
};

exports.sendMessage = (profile, message, data) => {
  const ownerSocket = connections[profile];
  if (ownerSocket) {
    io.to(ownerSocket).emit(message, data);
  }
};
