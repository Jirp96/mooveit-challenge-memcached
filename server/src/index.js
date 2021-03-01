#!/usr/bin/env node

var net = require('net');
var config = require('./config');

var server = net.createServer(function(socket) {
    socket.write('Echo server\r\n');
    socket.pipe(socket);
});

server.listen(config.PORT, config.IP);