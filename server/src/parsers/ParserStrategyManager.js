const ParserStrategyManager = () => {
    let Strategy;

    const setStrategy = (aStrategy) => {
        this.Strategy = aStrategy;
    };

    const parseCommandLine = (dataTokens) => {
        return this.Strategy.parseCommandLine(dataTokens);
    }

    const parseDataBlock = (dataTokens, dataBlock) => {
        return this.Strategy.parseDataBlock(dataTokens, dataBlock);
    }

    const getType = () => {
        return this.Strategy.getType();
    }

    return {parseCommandLine, parseDataBlock, setStrategy, getType};
};

exports.ParserStrategyManager = ParserStrategyManager();