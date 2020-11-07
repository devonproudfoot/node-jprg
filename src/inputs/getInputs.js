const readLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

function chooseAction(actions) {
  const maxOption = actions.length;
  let choice;

  actions.forEach((action, index) => {
    console.log(`${index + 1}: ${action.action}`);
  });

  readLine.question(`\nEnter the number of your choice: `, selection => {
    const selectionNum = +selection;

    if (selectionNum > 0 && selectionNum <= maxOption) {
      choice = selection - 1;
    } else {
      console.log('Invalid selection!');
    }
    readLine.pause();
  });
  return actions[choice];
}

module.exports = chooseAction;