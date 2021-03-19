#!/usr/bin/env node
/* eslint-disable max-len */

const net = require('net');
const config = require('./config');
const serverListener = require('./serverListener');

const server = net.createServer(serverListener.listener);

// TODO: check for ECONNRESET
server.on('clientError', (err, socket) => {
  if (err.code === 'ECONNRESET' || !socket.writable) socket.end('Client error\n');
  console.log('client error\n', err);
});

server.listen(config.PORT, config.IP);
