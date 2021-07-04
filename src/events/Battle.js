const EnemyParty = require("../party/EnemyParty");

class Battle {
  constructor(heroes, enemies) {
    this.heroes = heroes;
    this.enemies = this.generateEnemies(enemies);
    this.turnOrder = this.setTurnOrder();
    this.currentTurn = this.turnOrder[0];
    this.battleInProgress = true;
    this.victory = false;
  }

  doBattle() {
    const turnAction = {
      hero: () => {
        this.heroTurn();
      },
      enemy: () => {
        this.enemyTurn();
      },
    };

    while (this.battleInProgress) {
      let currentTurn = this.turn ? "hero" : "enemy";

      turnAction[currentTurn];
      this.battleStatus();
    }

    return this.completeBattle();
  }

  heroTurn() {}

  enemyTurn() {}

  battleStatus() {
    const heroesAlive = this.checkIfTeamIsAlive(this.heroes);
    const enemiesAlive = this.checkIfTeamIsAlive(this.enemies);

    if (!heroesAlive) {
      this.battleInProgress = false;
      this.victory = false;
    } else if (!enemiesAlive) {
      this.battleInProgress = false;
      this.victory = true;
    }
  }

  completeBattle() {
    if (this.victory) {
      let expEarned;
      this.enemies.forEach((enemy) => {
        expEarned += enemy.giveExp();
      });

      this.heroes.forEach((hero) => {
        hero.gainExp(expEarned);
      });
      return true;
    } else {
      return false;
    }
  }

  //private functions

  setTurnOrder() {
    let order = [];

    order.push(...this.heroes.getIds());
    order.push(...this.enemies.getIds());

    return order;
  }

  generateEnemies(enemies) {
    console.log(enemies);
    this.enemies = new EnemyParty(enemies);
    console.log(enemies);
  }

  checkIfTeamIsAlive(team) {
    team.forEach((member) => {
      if (member.getHealth() === 0) {
        return false;
      }
    });
    return true;
  }
}

module.exports = Battle;
