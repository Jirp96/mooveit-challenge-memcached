const dataParserModule = require('./dataParser');

const listener = (socket) => {
  this.dataParser = dataParserModule.Parser(); // TODO: change to new

  socket.on('data', (data) => {
    const result = this.dataParser.parseData(data);
    // TODO: Check with multiple clients & instances in parallel
    if ( result ) {
      socket.write(result.toString());
    }
  });
};

exports.listener = listener;
