const constants = require("../constants");
const Item = require("../domain/Item");
const Response = require("../domain/Response");

const BaseStorageCommandStrategy = () => {
    const parseItem = (dataTokens, dataBlock) => {
        let key = dataTokens[1];
        let flags = dataTokens[2];
        let exptime = dataTokens[3];
        let bytes = parseInt(dataTokens[4].replace(constants.CRLF_CHAR, ''));

        let sanitizedDataBlock = dataBlock.slice(0, bytes);
        
        return new Item(sanitizedDataBlock, key, exptime, flags);
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

    return {parseItem, validateData};
};

module.exports = BaseStorageCommandStrategy();