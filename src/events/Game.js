const enemyPool = require('../../gameJson/characters/enemies');
const Hero = require('../characters/Hero');
const Battle = require('../events/Battle');

const chooseAction = require('../inputs/getInputs');
const { displayPartyInfo } = require('../outputs/outputs');

const path = require('path');
const fs = require('fs');

class Game {
  constructor() {
    this.party = [];
    this.leader = null;
    this.gameInProgress = true;
  }

  newGame() {
    const originalHeroes = require('../../gameJson/characters/heroes');
    this.setParty(originalHeroes);
  }

  loadGame() {}

  playGame() {
    const startUp = chooseAction(this.startUpActions());
    console.log(startUp);
    // startUp.fn();

    // while (this.gameInProgress) {
    //   const action = chooseAction(this.inGameActions());
    // }

    // displayPartyInfo(this.party);
  }

  // needs work
  saveGame() {
    const savesPath = path.dirname('../../saves/');
    const fileName = `${Date.now()}-save.json`;
    const fullPath = `${savesPath}/${fileName}`;
    let fileContents = '';

    this.party.forEach(member => {
      fileContents += JSON.stringify(member);
    });

    fs.writeFileSync(fullPath, fileContents, 'utf-8');
  }

  startBattle() {
    const enemies = enemyPool.slice(0, 3);

    const battle = new Battle(this.party, enemies);
    return battle.doBattle();
  }

  // Private functions

  startUpActions() {
    return [
      {
        action: 'new game',
        fn: () => { 
          this.newGame();
        }
      },
      {
        action: 'load game',
        fn: () => {
          this.loadGame();
        }
      },
      {
        action: 'quit game',
        fn: () => {
          this.quitGame();
        }
      }
    ];
  }

  inGameActions() {
    return [
      {
        action: 'battle',
        fn: () => {
          this.startBattle();
        }
      },
      {
        action: 'save game',
        fn: () => {
          this.saveGame();
        }
      },
      {
        action: 'quit game',
        fn: () => {
          this.quitGame();
        }
      }
    ];
  }

  setParty(partyMembers) {
    partyMembers.forEach(member => {
      this.party.push(new Hero(member));
    });
  }

  gameOver() {
    process.exit();
  }

  quitGame() {
    process.exit();
  }
}

module.exports = Game;