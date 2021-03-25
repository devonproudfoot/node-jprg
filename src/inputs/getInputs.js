var inquirer = require('inquirer');

function chooseAction(actions) {
  let actionChoices = [];
  actions.forEach(action => {
    actionChoices.push(action.action);
  });

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'prompt',
        message: 'Select an option: ',
        choices: actionChoices
      }
    ])
    .then((answers) => {
      console.log(answers);
    }
  );
}

module.exports = chooseAction;