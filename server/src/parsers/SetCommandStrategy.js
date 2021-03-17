const constants = require("../constants");
const itemRepository = require('../ItemRepository');
const Item = require("../domain/Item");
const Response = require("../domain/Response");
const BaseCommandStrategy = require("./BaseCommandStrategy");

const SetCommandStrategy = () => {
    const parseCommandLine = (dataTokens) => {
        BaseCommandStrategy.validateData(dataTokens);        
    };

    const parseDataBlock = (dataTokens, dataBlock) => {        
        let noReply = dataTokens[5] && dataTokens[5].replace(constants.CRLF_CHAR, '').toLowerCase();
        let anItem = BaseCommandStrategy.parseItem(dataTokens, dataBlock);

        itemRepository.add(anItem.key, anItem);
        
        if ( noReply && noReply === constants.NO_REPLY ){
            return;
        }
        return new Response(constants.RESPONSE_TYPES.STORED);
    };

    const getType = () => {
        return constants.COMMAND_TYPES.STORAGE;
    };    

    return {parseCommandLine, parseDataBlock, getType};
};

module.exports = SetCommandStrategy();