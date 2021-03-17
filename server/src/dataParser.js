const constants = require('./constants');
const ParserStrategyManager = require('./parsers/ParserStrategyManager').ParserStrategyManager;
const ErrorResponse = require('./domain/ErrorResponse');
const GetStrategy = require('./parsers/GetCommandStrategy');
const SetStrategy = require('./parsers/SetCommandStrategy');
const AddStrategy = require('./parsers/AddCommandStrategy');
const ReplaceStrategy = require('./parsers/ReplaceCommandStrategy');
const AppendStrategy = require('./parsers/AppendCommandStrategy');
const PrependStrategy = require('./parsers/PrependCommandStrategy');
const CasStrategy = require('./parsers/CasCommandStrategy');

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
        let response = ParserStrategyManager.parseDataBlock(this.dataTokens, data);
        
        this.isBlock = false;

        return response;
    };

    const parseLineBlock = (data) => {
        let response;

        if (data[data.length -1] === constants.CR_ASCII && data[data.length -2] === constants.LF_ASCII) {            
            let dataString = data.toString();
            this.dataTokens = dataString.split(constants.TOKEN_SEPARATOR);            
            this.command = this.dataTokens[0];
            
            ParserStrategyManager.setStrategy(evaluateStrategy(this.command));
            
            response = processLineCommand();

            if ( ParserStrategyManager.getType() === constants.COMMAND_TYPES.STORAGE ){
                this.isBlock = true;
            }
        }
        else {
            response = new ErrorResponse(constants.RESPONSE_TYPES.CLIENT_ERROR, "Invalid format");
        }

        return response;
    };

    const processLineCommand = () => {
        let response;
        try {
            if ( ParserStrategyManager.getType() === constants.COMMAND_TYPES.STORAGE ){
                response = ParserStrategyManager.parseCommandLine(this.dataTokens);                                
            }
            else {
                response = ParserStrategyManager.parseDataBlock(this.dataTokens);                                
            }
        } catch (error) {
            return new ErrorResponse(constants.RESPONSE_TYPES.CLIENT_ERROR, error.message);
        }     
        return response;
    };

    const evaluateStrategy = (command) => {
        let strategy;
        switch (command.toUpperCase()) {
            case constants.COMMANDS.SET:
                strategy = SetStrategy;                    
                break;            
            case constants.COMMANDS.ADD:
                strategy = AddStrategy;
                break;
            case constants.COMMANDS.REPLACE:
                strategy = ReplaceStrategy;
                break;
            case constants.COMMANDS.APPEND:
                strategy = AppendStrategy;
                break;
            case constants.COMMANDS.PREPEND:
                strategy = PrependStrategy;
                break;        
            case constants.COMMANDS.CAS:
                strategy = CasStrategy;
                break;
            case constants.COMMANDS.GET:
            case constants.COMMANDS.GETS:
                strategy = GetStrategy;
                break;
            default:
                console.log(`Unknown command: ${this.command}`);
                break;
        }

        return strategy;
    }; 

    return {isBlock, parseData};
};

exports.Parser = Parser;