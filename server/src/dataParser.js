const constants = require('./constants');
const ParserStrategyManager = require('./parsers/ParserStrategyManager').ParserStrategyManager;
const ErrorResponse = require('./domain/ErrorResponse');
const SetStrategy = require('./parsers/SetCommandStrategy');
const GetStrategy = require('./parsers/GetCommandStrategy');

const Parser = () => {    
    let isBlock = false;

    let command = '';
    let dataTokens = [];

    const parseData = (data) => {
        return this.isBlock ? parseDataBlock(data) : parseLineBlock(data);
    };

    const parseDataBlock = (data) => {
        //TODO: Check that all the block was processed before executing
        //Check with data length.
        let response = ParserStrategyManager.executeCommand(this.dataTokens, data);
        
        this.isBlock = false;

        return response;
    };

    const parseLineBlock = (data) => {
        let response;

        if (data[data.length -1] === constants.CR_ASCII && data[data.length -2] === constants.LF_ASCII) {            
            let dataString = data.toString();
            this.dataTokens = dataString.split(constants.TOKEN_SEPARATOR);            
            this.command = this.dataTokens[0];
            
            //TODO: extract this 
            switch (this.command.toUpperCase()) {
                case constants.COMMANDS.SET:
                    ParserStrategyManager.setStrategy(SetStrategy);                    
                    break;            
                case constants.COMMANDS.GET:
                case constants.COMMANDS.GETS:
                    ParserStrategyManager.setStrategy(GetStrategy);
                    break;
                default:
                    console.log(`Unknown command: ${this.command}`);
                    break;
            }
            
            try {
                response = ParserStrategyManager.parseCommand(this.dataTokens);                                
            } catch (error) {
                return new ErrorResponse(constants.RESPONSE_TYPES.CLIENT_ERROR, error.message);
            }     

            if ( ParserStrategyManager.getType() === constants.COMMAND_TYPES.STORAGE ){
                this.isBlock = true;
            }
        }
        else {
            response = new ErrorResponse(constants.RESPONSE_TYPES.CLIENT_ERROR, "Invalid format");
        }

        return response;
    };

    return {isBlock, parseData};
};

exports.Parser = Parser;