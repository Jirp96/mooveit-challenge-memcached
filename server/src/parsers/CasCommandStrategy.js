/* eslint-disable new-cap */
const constants = require('../constants');
const itemRepository = require('../ItemRepository');
const Response = require('../domain/Response');
const BaseCommandStrategy = require('./BaseCommandStrategy');

const CasCommandStrategy = () => {
  const parseCommandLine = (dataTokens) => {
    BaseCommandStrategy.validateData(dataTokens);
    validateData(dataTokens);
  };

  const parseDataBlock = (dataTokens, dataBlock) => {
    const anItem = BaseCommandStrategy.parseItem(dataTokens, dataBlock);
    const existingItem = itemRepository.get(anItem.key);

    const clientCas = dataTokens[5].replace(constants.CRLF_CHAR, '');

    if ( !existingItem ) {
      return new Response(constants.RESPONSE_TYPES.NOT_FOUND);
    }

    if ( !!existingItem.casUnique && existingItem.casUnique != clientCas ) {
      return new Response(constants.RESPONSE_TYPES.EXISTS);
    }

    itemRepository.add(anItem.key, anItem);

    return BaseCommandStrategy.parseStoredResponse(dataTokens[6]);
  };

  const getType = () => {
    return constants.COMMAND_TYPES.STORAGE;
  };

  const validateData = (dataTokens) => {
    if ( !dataTokens[5] ) {
      throw new Error('cas unique can\'t be null');
    }

    return true;
  };

  return {parseCommandLine, parseDataBlock, validateData, getType};
};

module.exports = CasCommandStrategy();
