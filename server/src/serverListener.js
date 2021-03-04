const listener = (socket) => {
    const dataParserModule = require("./dataParser");
    this.dataParser = dataParserModule.Parser();

    socket.on('data', (data) => {
        this.dataParser.parseData(data);
    });
};

exports.listener = listener;