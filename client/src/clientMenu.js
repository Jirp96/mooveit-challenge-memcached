/* eslint-disable new-cap */
let readline = require('readline');

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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
    console.log(line);
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
      console.log("GET");
      break;
    case 2:
      console.log("GETS");
      break;
  
    default:
      console.log(option);  
      break;
  }

  showMenu();
}

exports.showMenu = showMenu;
