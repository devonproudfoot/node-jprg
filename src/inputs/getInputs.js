var inquirer = require('inquirer');

async function chooseAction(actions, questionPrompt) {
  questionPrompt = questionPrompt || 'Select an option: ';
  let actionChoices = [];
  actions.forEach(action => {
    actionChoices.push(action.action);
  });

  let response;

  await inquirer
    .prompt([
      {
        type: 'list',
        name: 'prompt',
        message: questionPrompt,
        choices: actionChoices
      }
    ])
    .then((answers) => {
      response = answers.prompt;
    }
  );
  
  return actions[actionChoices.indexOf(response)];
}

module.exports = chooseAction;