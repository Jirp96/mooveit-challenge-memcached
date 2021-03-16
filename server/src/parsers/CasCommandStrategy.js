const constants = require("../constants");
const itemRepository = require('../ItemRepository');
const Item = require("../domain/Item");
const Response = require("../domain/Response");

const CasCommandStrategy = () => {
    const parseCommand = (dataTokens) => {
        validateData(dataTokens);        
    };

    const executeCommand = (dataTokens, dataBlock) => {
        let key = dataTokens[1];
        let flags = dataTokens[2];
        let exptime = dataTokens[3];
        let bytes = parseInt(dataTokens[4].replace(constants.CRLF_CHAR, ''));
        let clientCas = dataTokens[4].replace(constants.CRLF_CHAR, '');        
        let existingItem = itemRepository.get(key);

        if ( !!existingItem ){
            return new Response(constants.RESPONSE_TYPES.NOT_FOUND);
        }
        
        if ( existingItem.casUnique != clientCas ){
            return new Response(constants.RESPONSE_TYPES.EXISTS);
        }

        let sanitizedDataBlock = dataBlock.slice(0, bytes);
        let anItem = new Item(sanitizedDataBlock, key, exptime, flags);
        itemRepository.add(key, anItem);
        //TODO: consider NoReply
        return new Response(constants.RESPONSE_TYPES.STORED);
    };

    const getType = () => {
        return constants.COMMAND_TYPES.STORAGE;
    };

    const validateData = (dataTokens) => {
        if ( dataTokens.length < constants.MIN_CAS_COMMAND_LENGTH ){
            throw new Error("Invalid arguments for command.");
        }

        if ( dataTokens[1].length <= 0 ){
            throw new Error("Key must not be empty.");
        }

        if ( dataTokens[2] < 0 ) {
            throw new Error("'Flags' field must be unsigned.");
        }

        if ( isNaN(dataTokens[3]) ){
            throw new Error("exptime must be a number.");
        }

        if ( !dataTokens[4] ){
            throw new Error("cas unique can't be null");
        }

        return true;
    };

    return {parseCommand, executeCommand, validateData, getType};
};

module.exports = CasCommandStrategy();