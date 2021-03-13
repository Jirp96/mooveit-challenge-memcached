const ParserStrategyManager = () => {
    let Strategy;

    const setStrategy = (aStrategy) => {
        this.Strategy = aStrategy;
    };

    const parseCommand = (dataTokens) => {
        return this.Strategy.parseCommand(dataTokens);
    }

    const executeCommand = (dataTokens, dataBlock) => {
        return this.Strategy.executeCommand(dataTokens, dataBlock);
    }

    return {parseCommand, executeCommand, setStrategy};
};

exports.ParserStrategyManager = ParserStrategyManager();