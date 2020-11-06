const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

function chooseBattleAction(actions) {
  let action;
  readline.question(`Select an action`, selection => {
    actions.forEach(action, index => {
      console.log(`${index}: ${action}`);
    });
    action = selection;
    readline.close()
  });
  return action
}

module.exports = chooseBattleAction;