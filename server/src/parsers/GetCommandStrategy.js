const constants = require("../constants");
const itemRepository = require('../ItemRepository');
const RetrievalResponse = require("../domain/RetrievalResponse");

const GetCommandStrategy = () => {
    const parseCommand = (dataTokens) => {
        validateData(dataTokens);        
        executeCommand();
    };

    const executeCommand = (dataTokens, dataBlock) => {
        let keys = dataTokens[1].replace(constants.LF_ASCII, '')
                    .replace(constants.CR_ASCII, '')
                    .split(constants.TOKEN_SEPARATOR);

        let items = itemRepository.gets(keys);
        return new RetrievalResponse(constants.RESPONSE_TYPES.RETRIEVAL_SUCCESS, items);        
    };

    const validateData = (dataTokens) => {
        if ( dataTokens.length < constants.MIN_RETRIEVAL_COMMAND_LENGTH ){
            throw new Error("Invalid arguments for command.");
        }

        if ( dataTokens[1].length <= 0 ){
            throw new Error("There must be at least one key.");
        }

    }

    return {parseCommand, executeCommand, validateData};
};

module.exports = GetCommandStrategy();