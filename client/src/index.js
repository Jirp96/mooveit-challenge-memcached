const Memcached = require('memcached');
const readline = require('readline');

const config = require('./config');
const userMenu = require('./clientMenu');
const CommandProcessor = require('./CommandProcessor');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const memcachedClient = new Memcached(`${config.IP}:${config.PORT}`);

CommandProcessor.setReadLine(rl);
CommandProcessor.setClient(memcachedClient);
userMenu.setCommandProcessor(CommandProcessor);
userMenu.setReadLine(rl);
userMenu.showMenu();

