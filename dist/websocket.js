"use strict";

var socketio = require('socket.io');

var io;
var connections = [];

exports.setupWebSocket = function (server) {
  io = socketio(server);
  io.on('connection', function (socket) {
    connections.push({
      id: socket.id
    });
  });
};

exports.sendMessage = function (message, data) {
  io.to(connections.id).emit(message, data);
};