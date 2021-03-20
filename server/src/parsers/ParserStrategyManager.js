/* eslint-disable new-cap */
const ParserStrategyManager = () => {
  const setStrategy = (aStrategy) => {
    Strategy = aStrategy;
  };

  const parseCommandLine = (dataTokens) => {
    return Strategy.parseCommandLine(dataTokens);
  };

  const parseDataBlock = (dataTokens, dataBlock) => {
    return Strategy.parseDataBlock(dataTokens, dataBlock);
  };

  const getType = () => {
    return Strategy.getType();
  };

  return {parseCommandLine, parseDataBlock, setStrategy, getType};
};

exports.ParserStrategyManager = ParserStrategyManager();
