/* eslint-disable new-cap */
const constants = require('../constants');
const itemRepository = require('../ItemRepository');
const RetrievalResponse = require('../domain/RetrievalResponse');

const GetCommandStrategy = () => {
  const parseCommandLine = (dataTokens) => {
    validateData(dataTokens);

    const keys = dataTokens[1].replace(constants.CRLF_CHAR, '')
        .split(constants.TOKEN_SEPARATOR);

    const items = itemRepository.gets(keys);
    // eslint-disable-next-line max-len
    return new RetrievalResponse(constants.RESPONSE_TYPES.RETRIEVAL_SUCCESS, items);
  };

  const parseDataBlock = (dataTokens, dataBlock) => {
    return;
  };

  const validateData = (dataTokens) => {
    if ( dataTokens.length < constants.MIN_RETRIEVAL_COMMAND_LENGTH ) {
      throw new Error('Invalid arguments for command.');
    }

    if ( dataTokens[1].length <= 0 ) {
      throw new Error('There must be at least one key.');
    }

    return true;
  };

  return {parseCommandLine, parseDataBlock, validateData};
};

module.exports = GetCommandStrategy();
