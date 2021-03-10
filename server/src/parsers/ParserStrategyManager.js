const ParserStrategyManager = () => {
    let Strategy;

    const setStrategy = (aStrategy) => {
        this.Strategy = aStrategy;
    };

    const parseCommand = (dataTokens) => {
        this.Strategy.ParseCommand(dataTokens);
    }

    const executeCommand = (dataTokens) => {
        this.Strategy.ExecuteCommand(dataTokens);
    }

    return {parseCommand, executeCommand, setStrategy};
};

exports.ParserStrategyManager = ParserStrategyManager();