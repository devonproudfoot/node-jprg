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

  //private functions

  setFirstTurn() {
    return (Math.random() > 0.5) ? true : false;
  }

  generateEnemies(enemies) {
    let enemyObjects = [];

    enemies.forEach( enemy => enemyObjects.push(new Enemy(enemy)) );
    return enemyObjects;
  }

  checkIfTeamIsAlive(team) {
    team.forEach(member => {
      if (member.getHealth() === 0) {
        return false;
      }
    });
    return true;
  }
}

module.exports = Battle;