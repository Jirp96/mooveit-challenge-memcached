/* eslint-disable new-cap */
const dataParserModule = require('./dataParser');

const listener = (socket) => {
  dataParser = dataParserModule.Parser();

  socket.on('data', (data) => {
    const result = dataParser.parseData(data);
    if ( result ) {
      socket.write(result.toString());
    }
  });
};

exports.listener = listener;
