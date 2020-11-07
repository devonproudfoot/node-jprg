const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

function chooseAction(actions) {
  const maxOption = actions.length;

  actions.forEach((action, index) => {
    console.log(`${index + 1}: ${action.action}`);
  });

  readline.question(`\nEnter the number of your choice: `, selection => {
    const selectionNum = +selection;

    if (selectionNum > 0 && selectionNum <= maxOption) {
      readline.close();
    } else {
      console.log('Invalid selection!');
    }
  });
}

module.exports = chooseAction;