/* eslint-disable new-cap */
const constants = require('../constants');
const Item = require('../domain/Item');

const BaseStorageCommandStrategy = () => {
  const parseItem = (dataTokens, dataBlock) => {
    const key = dataTokens[1];
    const flags = dataTokens[2];
    const exptime = dataTokens[3];
    const bytes = parseInt(dataTokens[4].replace(constants.CRLF_CHAR, ''));

    const sanitizedDataBlock = dataBlock.slice(0, bytes);

    return new Item(sanitizedDataBlock, key, exptime, flags);
  };

  const validateData = (dataTokens) => {
    if ( dataTokens.length < constants.MIN_STORAGE_COMMAND_LENGTH ) {
      throw new Error('Invalid arguments for command.');
    }

    if ( dataTokens[1].length <= 0 ) {
      throw new Error('Key must not be empty.');
    }

    if ( dataTokens[2] < 0 ) {
      throw new Error('\'Flags\' field must be unsigned.');
    }

    if ( isNaN(dataTokens[3]) ) {
      throw new Error('exptime must be a number.');
    }

    return true;
  };

  const parseNoReply = (noReplyToken) => {
    return noReplyToken &&
        noReplyToken.replace(constants.CRLF_CHAR, '').toLowerCase();
  };

  return {parseItem, validateData, parseNoReply};
};

module.exports = BaseStorageCommandStrategy();
