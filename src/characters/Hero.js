const Character = require('./Character');

class Hero extends Character {
  constructor(character) {
    super(character);
    this.expPoints = 0;
    this.level = 1;
  }

  gainExp(exp) {
    const expToNextLevel = Math.pow(this.level, 2) * 10;
    this.expPoints += exp;
    if (this.expPoints > expToNextLevel) this.levelUp();
  }

  levelUp() {
    this.maxHP += this.level * 5;
    this.maxMP += this.level * 5;
    this.attack += this.level * 5;
    this.defense += this.level * 5;
    this.level += 1;
  }

  run() {
    
  }

  getActions() {
    let actions = super.getActions();
    actions.push(
      {
        type: 'run',
        fn: this.run()
      }
    );
    return actions;
  }
}

module.exports = Hero;