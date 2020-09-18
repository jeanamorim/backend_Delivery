"use strict";

var socketio = require('socket.io');

var io;
var connections = {};

exports.setupWebSocket = function (server) {
  io = socketio(server);
  io.on('connection', function (socket) {
    var profile_id = socket.handshake.query.profile_id;
    connections[profile_id] = socket.id;
  });
};

exports.connectionsId = function () {
  return connections;
};

exports.sendMessage = function (profile, message, data) {
  var ownerSocket = connections[profile];

  if (ownerSocket) {
    io.to(ownerSocket).emit(message, data);
  }
};