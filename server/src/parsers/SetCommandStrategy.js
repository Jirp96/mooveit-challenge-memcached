const constants = require("../constants");
const Item = require("../domain/Item");

const SetCommandStrategy = () => {
    const parseCommand = (dataTokens) => {
        this.validate(dataTokens);        
    };

    const executeCommand = (dataTokens, dataBlock) => {
        const itemRepository = require('../ItemRepository');
        let key = dataTokens[1];
        let flags = dataTokens[2];
        let exptime = dataTokens[3];

        let anItem = new Item(dataBlock, exptime, flags);

        itemRepository.add(key, anItem);
    };

    const validate = (dataTokens) => {
        if ( dataTokens.length < constants.MIN_STORAGE_COMMAND_LENGTH ){
            throw new Error("Invalid arguments for command.");
        }

        if ( dataTokens[1].length <= 0 ){
            throw new Error("Key must not be empty.");
        }

        if ( dataTokens[2] < 0 ) {
            throw new Error("'Flags' field must be unsigned.")
        }

        if ( !isNaN(dataTokens[3]) ){
            throw new Error("exptime must be a number.");
        }

    }

    return {parseCommand, executeCommand};
};

exports.SetCommandStrategy = SetCommandStrategy();