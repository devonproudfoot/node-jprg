const enemyPool = require("../../gameJson/characters/enemies");
const Battle = require("../events/Battle");
const HeroParty = require("../party/HeroParty");

const chooseAction = require("../inputs/getInputs");
const { displayPartyInfo } = require("../outputs/outputs");

const path = require("path");
const fs = require("fs");

class Game {
  constructor() {
    this.party;
    this.leader = null;
    this.gameInProgress = true;
  }

  newGame() {
    const originalHeroes = require("../../gameJson/characters/heroes");
    this.setParty(originalHeroes);
  }

  loadGame() {}

  async playGame() {
    const startUp = await chooseAction(this.startUpActions());

    startUp.fn();

    while (this.gameInProgress) {
      const action = await chooseAction(this.inGameActions());
      action.fn();
    }
  }

  // needs work
  saveGame() {
    const savesPath = path.dirname("../../saves/");
    const fileName = `${Date.now()}-save.json`;
    const fullPath = `${savesPath}/${fileName}`;
    let fileContents = "";

    this.party.forEach((member) => {
      fileContents += JSON.stringify(member);
    });

    fs.writeFileSync(fullPath, fileContents, "utf-8");
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
        action: "new game",
        fn: () => {
          this.newGame();
        },
      },
      {
        action: "load game",
        fn: () => {
          this.loadGame();
        },
      },
      {
        action: "quit game",
        fn: () => {
          this.quitGame();
        },
      },
    ];
  }

  inGameActions() {
    return [
      {
        action: "battle",
        fn: () => {
          this.startBattle();
        },
      },
      {
        action: "check party status",
        fn: () => {
          this.checkPartyStatus();
        },
      },
      {
        action: "save game",
        fn: () => {
          this.saveGame();
        },
      },
      {
        action: "quit game",
        fn: () => {
          this.quitGame();
        },
      },
    ];
  }

  setParty(partyMembers) {
    this.party = new HeroParty(partyMembers);
  }

  gameOver() {
    process.exit();
  }

  quitGame() {
    process.exit();
  }

  checkPartyStatus() {
    console.log(this.party);
    displayPartyInfo(this.party);
  }
}

module.exports = Game;
