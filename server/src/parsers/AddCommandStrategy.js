const constants = require("../constants");
const itemRepository = require('../ItemRepository');
const Item = require("../domain/Item");
const Response = require("../domain/Response");
const BaseCommandStrategy = require("./BaseCommandStrategy");

const AddCommandStrategy = () => {
    const parseCommandLine = (dataTokens) => {
        BaseCommandStrategy.validateData(dataTokens);        
    };

    const parseDataBlock = (dataTokens, dataBlock) => {        
        let anItem = BaseCommandStrategy.parseItem(dataTokens, dataBlock);
        
        if ( itemRepository.exists(anItem.key) ){
            return new Response(constants.RESPONSE_TYPES.NOT_STORED);
        }
                
        itemRepository.add(anItem.key, anItem);
        //TODO: consider NoReply
        return new Response(constants.RESPONSE_TYPES.STORED);
    };

    const getType = () => {
        return constants.COMMAND_TYPES.STORAGE;
    };

    return {parseCommandLine, parseDataBlock, getType};
};

module.exports = AddCommandStrategy();