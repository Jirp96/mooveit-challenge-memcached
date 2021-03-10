const listener = (socket) => {
    const dataParserModule = require("./dataParser");
    this.dataParser = dataParserModule.Parser();

    socket.on('data', (data) => {
        let result = this.dataParser.parseData(data);

        if ( result ){
            socket.write(result.toString());
        }
    });
};

exports.listener = listener;