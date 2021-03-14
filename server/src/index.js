#!/usr/bin/env node

const net             = require('net');
const config          = require('./config');
const serverListener  = require('./serverListener');

var server = net.createServer(serverListener.listener);

server.listen(config.PORT, config.IP);