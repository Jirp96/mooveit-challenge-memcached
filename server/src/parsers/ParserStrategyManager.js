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

  return {parseCommandLine, parseDataBlock, setStrategy};
};

exports.ParserStrategyManager = ParserStrategyManager();
