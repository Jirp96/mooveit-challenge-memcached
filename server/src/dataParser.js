/* eslint-disable max-len */
const constants = require('./constants');
// eslint-disable-next-line max-len
const ParserStrategyManager = require('./parsers/ParserStrategyManager').ParserStrategyManager;
const ErrorResponse = require('./domain/ErrorResponse');
const GetStrategy = require('./parsers/GetCommandStrategy');
const SetStrategy = require('./parsers/SetCommandStrategy');
const AddStrategy = require('./parsers/AddCommandStrategy');
const ReplaceStrategy = require('./parsers/ReplaceCommandStrategy');
const AppendStrategy = require('./parsers/AppendCommandStrategy');
const PrependStrategy = require('./parsers/PrependCommandStrategy');
const CasStrategy = require('./parsers/CasCommandStrategy');

const Parser = () => {
  let isBlock = false;

  // const command = '';
  // const dataTokens = [];

  const parseData = (data) => {
    try {
      // TODO: fix
      const endLineIndex = data.findIndex((elem, i, arr) => {
        return elem == 13 && i+1 < arr.length && arr[i+1] == 10;
      });
      const commandLineData = data.slice(0, endLineIndex);
      const dataBlock = data.slice(endLineIndex + 2, data.length);

      let response = parseLineBlock(commandLineData);

      if ( !response && dataBlock) {
        response = parseDataBlock(dataBlock);
      }

      return response;
      // return isBlock ? parseDataBlock(data) : parseLineBlock(data);
    } catch (error) {
      return new ErrorResponse(constants.RESPONSE_TYPES.SERVER_ERROR, error.message);
    }
  };

  const parseDataBlock = (data) => {
    // eslint-disable-next-line max-len
    const response = ParserStrategyManager.parseDataBlock(dataTokens, data);

    isBlock = false;

    return response;
  };

  const parseLineBlock = (data) => {
    const dataString = data.toString();
    dataTokens = dataString.split(constants.TOKEN_SEPARATOR);
    command = dataTokens[0];

    try {
      ParserStrategyManager.setStrategy(evaluateStrategy(command));
    } catch (error) {
      return new ErrorResponse(constants.RESPONSE_TYPES.CLIENT_ERROR, error.message);
    }

    const response = processLineCommand();

    if ( ParserStrategyManager.getType() === constants.COMMAND_TYPES.STORAGE ) {
      isBlock = true;
    }

    return response;
  };

  const processLineCommand = () => {
    let response;
    try {
      response = ParserStrategyManager.parseCommandLine(dataTokens);
    } catch (error) {
      return new ErrorResponse(constants.RESPONSE_TYPES.CLIENT_ERROR, error.message);
    }
    return response;
  };

  const evaluateStrategy = (command) => {
    let strategy;
    switch (command.toUpperCase()) {
      case constants.COMMANDS.SET:
        strategy = SetStrategy;
        break;
      case constants.COMMANDS.ADD:
        strategy = AddStrategy;
        break;
      case constants.COMMANDS.REPLACE:
        strategy = ReplaceStrategy;
        break;
      case constants.COMMANDS.APPEND:
        strategy = AppendStrategy;
        break;
      case constants.COMMANDS.PREPEND:
        strategy = PrependStrategy;
        break;
      case constants.COMMANDS.CAS:
        strategy = CasStrategy;
        break;
      case constants.COMMANDS.GET:
      case constants.COMMANDS.GETS:
        strategy = GetStrategy;
        break;
      default:
        throw new Error('Invalid command.');
    }

    return strategy;
  };

  return {isBlock, parseData};
};

exports.Parser = Parser;
