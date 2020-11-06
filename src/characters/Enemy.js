const Character = require('./Character');

class Enemy extends Character {
  constructor(character) {
    super(character);
  }

  giveExp() {
    return Math.floor((hitPoints + magicPoints + attack + defense) / 100);
  }
  
  getActions() {
    
  }
}

module.exports = Enemy;