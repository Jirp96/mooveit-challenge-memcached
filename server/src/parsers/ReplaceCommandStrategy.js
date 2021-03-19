/* eslint-disable new-cap */
const constants = require('../constants');
const itemRepository = require('../ItemRepository');
const Response = require('../domain/Response');
const BaseCommandStrategy = require('./BaseCommandStrategy');

const ReplaceCommandStrategy = () => {
  const parseCommandLine = (dataTokens) => {
    BaseCommandStrategy.validateData(dataTokens);
  };

  const parseDataBlock = (dataTokens, dataBlock) => {
    const anItem = BaseCommandStrategy.parseItem(dataTokens, dataBlock);

    if ( !itemRepository.exists(anItem.key) ) {
      return new Response(constants.RESPONSE_TYPES.NOT_STORED);
    }

    itemRepository.add(anItem.key, anItem);
    return BaseCommandStrategy.parseStoredResponse(dataTokens[5]);
  };

  const getType = () => {
    return constants.COMMAND_TYPES.STORAGE;
  };

  return {parseCommandLine, parseDataBlock, getType};
};

module.exports = ReplaceCommandStrategy();
