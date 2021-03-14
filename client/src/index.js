var net = require('net');

var client = new net.Socket();
var config = require('./config');

client.connect(config.PORT, config.IP, function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
	console.log('Received: ' + data);	
});

client.on('error', function(err) {
	console.log('Error: ' + err);	
});

client.on('close', function() {
	console.log('Connection closed');
});