var net = require('net');
var Memcached = require('memcached');
let readline = require('readline');

const config = require('./config');
const userMenu = require('./clientMenu');
const CommandProcessor = require('./CommandProcessor');

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var memcachedClient = new Memcached(`${config.IP}:${config.PORT}`);

CommandProcessor.setReadLine(rl);
CommandProcessor.setClient(memcachedClient);
userMenu.setCommandProcessor(CommandProcessor);
userMenu.setReadLine(rl);
userMenu.showMenu();

