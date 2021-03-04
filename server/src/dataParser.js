const Parser = () => {
    const config = require('./config');

    let isBlock = false;


    let command = '';
    let key = '';
    let flags = [];
    let exptime = 0;
    let bytes = 0;
    let noreply = false;

    const parseData = (data) => {
        if (this.isBlock){
            parseDataBlock(data);
        }
        else {
            parseLineBlock(data);            
        }
    };

    const parseDataBlock = (data) => {
        console.log(data);
    };

    const parseLineBlock = (data) => {
        if (data[data.length -1] === config.CR_ASCII && data[data.length -2] === config.LF_ASCII) {
            let dataString = data.toString();
            let dataTokens = dataString.split(config.TOKEN_SEPARATOR);
            
            this.command = dataTokens[0];
            
            //TODO: extract this 
            switch (this.command) {
                case config.COMMANDS.SET:
                    //TODO: call parser for set command
                    console.log(`Command: ${this.command}\n`);
                    console.log(`Data tokens: ${dataTokens}\n`);
                    break;
            
                default:
                    console.log(`Unknown command: ${this.command}`);
                    break;
            }


            this.isBlock = true;
        }
        else {
            //TODO: error
        }
    };

    return {isBlock, parseData};
};

exports.Parser = Parser;