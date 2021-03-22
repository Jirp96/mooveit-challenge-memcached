/* eslint-disable new-cap */

const Menu = () => {
  let commandProcessor;
  let rl;

  const setCommandProcessor = (processor) => {
    commandProcessor = processor;
  };

  const setReadLine = (readLine) => {
    rl = readLine;
  };

  const showMenu = () => {
    let selectedOption = 0;
    console.log('1) Get');
    console.log('2) Gets');
    console.log('3) Set');
    console.log('4) Add');
    console.log('5) Replace');
    console.log('6) Append');
    console.log('7) Prepend');
    console.log('8) Cas');
    console.log('0) Exit');

    rl.question('Select a command: ', function(answer) {
      selectedOption = parseInt(answer);
      try {
        processSelectedOption(selectedOption);
      } catch (err) {
        console.log(`There was an error: ${err.message}`);
      }
    });
    return selectedOption;
  };

  const processSelectedOption = (option) => {
    switch (option) {
      case 0:
        process.exit(0);
      case 1:
        commandProcessor.processGet(processRetrievalResponse);
        break;
      case 2:
        commandProcessor.processGets(processRetrievalResponse);
        break;
      case 3:
        commandProcessor.processSet(processStorageResponse);
        break;
      case 4:
        commandProcessor.processAdd(processStorageResponse);
        break;
      case 5:
        commandProcessor.processReplace(processStorageResponse);
        break;
      case 6:
        commandProcessor.processAppend(processStorageResponse);
        break;
      case 7:
        commandProcessor.processPrepend(processStorageResponse);
        break;
      case 8:
        commandProcessor.processCas(processStorageResponse);
        break;
      default:
        console.log(option);
        break;
    }
  };

  const processStorageResponse = (err) => {
    console.log('\n');
    if (err) {
      console.log('There was an error with the command: ' + err.message);
    } else {
      console.log('Success!');
    }
    console.log('\n');
    showMenu();
  };

  const processRetrievalResponse = (err, data) => {
    console.log('\n');
    if (err) {
      console.log(err);
    } else if (data) {
      Object.keys(data).forEach((key) => {
        console.log(`${key}: ${data[key]}`);
      });
    } else {
      console.log('Empty response');
    }
    console.log('\n');
    showMenu();
  };

  return {showMenu, setCommandProcessor, setReadLine};
};

module.exports = Menu();
