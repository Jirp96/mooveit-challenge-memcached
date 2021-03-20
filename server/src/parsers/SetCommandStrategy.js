/* eslint-disable new-cap */
const itemRepository = require('../ItemRepository');
const BaseCommandStrategy = require('./BaseCommandStrategy');

const SetCommandStrategy = () => {
  const parseCommandLine = (dataTokens) => {
    BaseCommandStrategy.validateData(dataTokens);
  };

  const parseDataBlock = (dataTokens, dataBlock) => {
    const anItem = BaseCommandStrategy.parseItem(dataTokens, dataBlock);
    itemRepository.add(anItem.key, anItem);

    return BaseCommandStrategy.parseStoredResponse(dataTokens[5]);
  };

  return {parseCommandLine, parseDataBlock};
};

module.exports = SetCommandStrategy();
