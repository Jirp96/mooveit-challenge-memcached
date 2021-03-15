const constants = require("../constants");
const itemRepository = require('../ItemRepository');
const RetrievalResponse = require("../domain/RetrievalResponse");

const GetCommandStrategy = () => {
    const parseCommand = (dataTokens) => {
        validateData(dataTokens);        
        
        let keys = dataTokens[1].replace(constants.CRLF_CHAR, '')
                    .split(constants.TOKEN_SEPARATOR);

        let items = itemRepository.gets(keys);
        return new RetrievalResponse(constants.RESPONSE_TYPES.RETRIEVAL_SUCCESS, items);
    };

    const executeCommand = (dataTokens, dataBlock) => {
        return;    
    };

    const getType = () => {
        return constants.COMMAND_TYPES.RETRIEVAL;
    };

    const validateData = (dataTokens) => {
        if ( dataTokens.length < constants.MIN_RETRIEVAL_COMMAND_LENGTH ){
            throw new Error("Invalid arguments for command.");
        }

        if ( dataTokens[1].length <= 0 ){
            throw new Error("There must be at least one key.");
        }

        return true;
    }

    return {parseCommand, executeCommand, validateData, getType};
};

module.exports = GetCommandStrategy();