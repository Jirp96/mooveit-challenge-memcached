/* eslint-disable new-cap */
const constants = require('../constants');
const itemRepository = require('../ItemRepository');
const Response = require('../domain/Response');
const BaseCommandStrategy = require('./BaseCommandStrategy');

const SetCommandStrategy = () => {
  const parseCommandLine = (dataTokens) => {
    BaseCommandStrategy.validateData(dataTokens);
  };

  const parseDataBlock = (dataTokens, dataBlock) => {
    const noReply = BaseCommandStrategy.parseNoReply(dataTokens[5]);
    const anItem = BaseCommandStrategy.parseItem(dataTokens, dataBlock);

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

module.exports = SetCommandStrategy();
