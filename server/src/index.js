#!/usr/bin/env node

var net             = require('net');
var config          = require('./config');
var serverListener  = require('./serverListener');

var server = net.createServer(serverListener.listener);

server.listen(config.PORT, config.IP);