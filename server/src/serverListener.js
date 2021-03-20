/* eslint-disable max-len */
/* eslint-disable new-cap */
const dataParserModule = require('./dataParser');

const listener = (socket) => {
  socket.on('end', () => {
    console.log('');
  });

  socket.on('error', (err, socket) => {
    if (err.code === 'ECONNRESET' || !socket.writable) console.log('Connection reset\n');
    console.log('Client error\n', err);
  });

  dataParser = dataParserModule.Parser();

  socket.on('data', (data) => {
    const result = dataParser.parseData(data);
    if ( result ) {
      socket.write(result.toString());
    }
  });
};

exports.listener = listener;
