const constants = require("../constants");
const itemRepository = require('../ItemRepository');
const Item = require("../domain/Item");
const Response = require("../domain/Response");

const AppendCommandStrategy = () => {
    const parseCommand = (dataTokens) => {
        validateData(dataTokens);        
    };

    const executeCommand = (dataTokens, dataBlock) => {
        let key = dataTokens[1];
        let flags = dataTokens[2];
        let exptime = dataTokens[3];
        let bytes = parseInt(dataTokens[4].replace(constants.CRLF_CHAR, ''));        

        if ( !itemRepository.exists(key) ){
            return new Response(constants.RESPONSE_TYPES.NOT_STORED);
        }
        
        let existingItem = itemRepository.get(key);

        let sanitizedDataBlock = dataBlock.slice(0, bytes);
        let combinedDataBlock = existingItem.dataBlock.concat(sanitizedDataBlock);
        let anItem = new Item(combinedDataBlock, key, exptime, flags);
        itemRepository.add(key, anItem);
        //TODO: consider NoReply
        return new Response(constants.RESPONSE_TYPES.STORED);
    };

    const getType = () => {
        return constants.COMMAND_TYPES.STORAGE;
    };

    const validateData = (dataTokens) => {
        if ( dataTokens.length < constants.MIN_STORAGE_COMMAND_LENGTH ){
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

        return true;
    };

    return {parseCommand, executeCommand, validateData, getType};
};

module.exports = AppendCommandStrategy();