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
    console.log("Select a command: ");
    console.log("1) Get");
    console.log("2) Gets");
    console.log("3) Set");
    console.log("4) Add");
    console.log("5) Replace");
    console.log("6) Append");
    console.log("7) Prepend");
    console.log("8) Cas");
    console.log("0) Exit");
  
    rl.on('line', function(line){
      selectedOption = parseInt(line);
      processSelectedOption(selectedOption);
    });  
    return selectedOption;
  };

  const processSelectedOption = (option) => {
    switch (option) {
      case 0:
        process.exit(0);
      case 1:
        commandProcessor.processGet();
        break;
      case 2:
        commandProcessor.processGets();
        break;
      case 3:
        commandProcessor.processSet();
        break;
      case 4:
        commandProcessor.processAdd();
        break;
      case 5:
        commandProcessor.processReplace();
        break;
      case 6:
        commandProcessor.processAppend();
        break;
      case 7:
        commandProcessor.processPrepend();
        break;
      case 8:
        commandProcessor.processCas();
        break;
      default:
        console.log(option);  
        break;
    }
  
    showMenu();
  }

  return {showMenu, setCommandProcessor, setReadLine};
};

module.exports = Menu();
