const enemyPool = require('../../gameJson/characters/enemies');
const Hero = require('../characters/Hero');
const Battle = require('../events/Battle');
const { displayPartyInfo, displayBattleInfo } = require('../outputs/outputs');

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
    // while (this.gameInProgress) {
    //   this.startBattle();
    // }
    // this.startBattle();
    displayPartyInfo(this.party);
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

  setParty(partyMembers) {
    partyMembers.forEach(member => {
      this.party.push(new Hero(member));
    });
  }

  gameOver() {
    process.exit();
  }
}

module.exports = Game;