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

    const getType = () => {
        return this.Strategy.getType();
    }

    return {parseCommand, executeCommand, setStrategy, getType};
};

exports.ParserStrategyManager = ParserStrategyManager();