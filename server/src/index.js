#!/usr/bin/env node
/* eslint-disable max-len */

const net = require('net');
const config = require('./config');
const serverListener = require('./serverListener');

const server = net.createServer(serverListener.listener);

server.listen(config.PORT, config.IP);
