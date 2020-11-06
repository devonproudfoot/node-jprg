const Enemy = require('../characters/Enemy');

class Battle {
  constructor(heroes, enemies) {
    this.heroes = heroes;
    this.enemies = this.generateEnemies(enemies);
    this.turn = this.setFirstTurn();
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
      }
    }

    while (this.battleInProgress) {
      let currentTurn = this.turn ? 'hero' : 'enemy';

      turnAction[currentTurn];
      this.battleStatus();
    }

    return this.completeBattle();
  }

  heroTurn() {

  }

  enemyTurn() {

  }

  battleStatus() {
    let partyHealth = 0;
    let enemiesHealth = 0;

    this.heroes.forEach(hero => partyHealth += hero.getHealth() );
    this.enemies.forEach(enemy => enemiesHealth += enemy.getHealth() );

    if (!enemiesHealth) {
      this.battleInProgress = false;
      this.victory = false;
    } else if (!partyHealth) {
      this.battleInProgress = false;
      this.victory = true;
    }
  }

  completeBattle() {
    if (this.victory) {
      let expEarned;
      this.enemies.forEach(enemy => {
        expEarned += enemy.giveExp();
      });
      
      this.heroes.forEach(hero => {
        hero.gainExp(expEarned);
      });
      return true;
    } else {
      return false;
    }
  }

  setFirstTurn() {
    return (Math.random() > 0.5) ? true : false;
  }

  generateEnemies(enemies) {
    let enemyObjects = [];

    enemies.forEach( enemy => enemyObjects.push(new Enemy(enemy)) );
    return enemyObjects;
  }
}

module.exports = Battle;