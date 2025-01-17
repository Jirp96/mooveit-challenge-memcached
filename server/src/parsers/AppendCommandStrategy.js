/* eslint-disable new-cap */
const constants = require('../constants');
const itemRepository = require('../ItemRepository');
const Response = require('../domain/Response');
const BaseCommandStrategy = require('./BaseCommandStrategy');

const AppendCommandStrategy = () => {
  const parseCommandLine = (dataTokens) => {
    BaseCommandStrategy.validateData(dataTokens);
  };

  const parseDataBlock = (dataTokens, dataBlock) => {
    const anItem = BaseCommandStrategy.parseItem(dataTokens, dataBlock);

    if ( !itemRepository.exists(anItem.key) ) {
      return new Response(constants.RESPONSE_TYPES.NOT_STORED);
    }

    const existingItem = itemRepository.get(anItem.key);
    anItem.data = Buffer.from([...existingItem.data].concat(...anItem.data));

    itemRepository.add(anItem.key, anItem);

    return BaseCommandStrategy.parseStoredResponse(dataTokens[5]);
  };

  return {parseCommandLine, parseDataBlock};
};

module.exports = AppendCommandStrategy();
