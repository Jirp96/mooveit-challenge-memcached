const constants = require("../constants");
const itemRepository = require('../ItemRepository');
const Item = require("../domain/Item");
const Response = require("../domain/Response");

const SetCommandStrategy = () => {
    const parseCommand = (dataTokens) => {
        validateData(dataTokens);        
    };

    const executeCommand = (dataTokens, dataBlock) => {
        let key = dataTokens[1];
        let flags = dataTokens[2];
        let exptime = dataTokens[3];

        let anItem = new Item(dataBlock, key, exptime, flags);

        itemRepository.add(key, anItem);

        //TODO: consider NoReply
        return new Response(constants.RESPONSE_TYPES.STORED);
    };

    const validateData = (dataTokens) => {
        if ( dataTokens.length < constants.MIN_STORAGE_COMMAND_LENGTH ){
            throw new Error("Invalid arguments for command.");
        }

        if ( dataTokens[1].length <= 0 ){
            throw new Error("Key must not be empty.");
        }

        if ( dataTokens[2] < 0 ) {
            throw new Error("'Flags' field must be unsigned.")
        }

        if ( isNaN(dataTokens[3]) ){
            throw new Error("exptime must be a number.");
        }

    };

    return {parseCommand, executeCommand, validateData};
};

module.exports = SetCommandStrategy();