const Parser = () => {
    const constants = require('./constants');
    const ParserStrategyManager = require('./parsers/ParserStrategyManager').ParserStrategyManager;
    const ErrorResponse = require('./domain/ErrorResponse');

    let isBlock = false;

    let command = '';
    let key = '';
    let flags = [];
    let exptime = 0;
    let bytes = 0;
    let noreply = false;

    const parseData = (data) => {
        return isBlock ? parseDataBlock(data) : parseLineBlock(data);
    };

    const parseDataBlock = (data) => {
        //TODO: Process all the data block, if it's split
        ParserStrategyManager.parseCommand(dataTokens);
        
        this.isBlock = false;
    };

    const parseLineBlock = (data) => {
        let response;

        if (data[data.length -1] === constants.CR_ASCII && data[data.length -2] === constants.LF_ASCII) {            
            let dataString = data.toString();
            let dataTokens = dataString.split(constants.TOKEN_SEPARATOR);            
            this.command = dataTokens[0];
            
            //TODO: extract this 
            switch (this.command) {
                case constants.COMMANDS.SET:
                    const SetStrategy = require('./parsers/SetCommandStrategy');
                    ParserStrategyManager.setStrategy(SetStrategy);                    
                    break;            
                default:
                    console.log(`Unknown command: ${this.command}`);
                    break;
            }
            
            try {
                response = ParserStrategyManager.parseCommand(dataTokens);                                
            } catch (error) {
                return new ErrorResponse(constants.RESPONSE_TYPES.CLIENT_ERROR, error.message);
            }     
            this.isBlock = true;                   
        }
        else {
            response = new ErrorResponse(constants.RESPONSE_TYPES.CLIENT_ERROR, "Invalid format");
        }

        return response;
        //TODO: Return response object: type of result, message
    };

    return {isBlock, parseData};
};

exports.Parser = Parser;