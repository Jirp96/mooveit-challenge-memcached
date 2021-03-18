/* eslint-disable new-cap */
const constants = require('../constants');
const itemRepository = require('../ItemRepository');
const Response = require('../domain/Response');
const BaseCommandStrategy = require('./BaseCommandStrategy');

const PrependCommandStrategy = () => {
  const parseCommandLine = (dataTokens) => {
    BaseCommandStrategy.validateData(dataTokens);
  };

  const parseDataBlock = (dataTokens, dataBlock) => {
    const noReply = BaseCommandStrategy.parseNoReply(dataTokens[5]);
    const anItem = BaseCommandStrategy.parseItem(dataTokens, dataBlock);

    // TODO: Refactor
    if ( !itemRepository.exists(anItem.key) ) {
      return new Response(constants.RESPONSE_TYPES.NOT_STORED);
    }

    const existingItem = itemRepository.get(anItem.key);
    const combinedDataBlock = anItem.data.concat(existingItem.data);
    anItem.dataBlock = combinedDataBlock;

    itemRepository.add(anItem.key, anItem);
    if ( noReply && noReply === constants.NO_REPLY ) {
      return;
    }
    return new Response(constants.RESPONSE_TYPES.STORED);
  };

  const getType = () => {
    return constants.COMMAND_TYPES.STORAGE;
  };

  return {parseCommandLine, parseDataBlock, getType};
};

module.exports = PrependCommandStrategy();
