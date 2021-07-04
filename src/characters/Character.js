class Character {
  constructor(character) {
    this.name = character.name;
    this.currentHP = character.hitPoints;
    this.maxHP = character.hitPoints;
    this.currentMP = character.magicPoints;
    this.maxMP = character.magicPoints;
    this.attack = character.attack;
    this.defense = character.defense;
    this.magic = character.magic;
    this.critChance = 0.1;
    this.status = null;
  }

  doAttack() {
    return this.critChance > Math.random() ? this.attack * 2 : this.attack;
  }

  getHealth() {
    return this.currentHP;
  }

  getMaxHealth() {
    return this.maxHP;
  }

  getMP() {
    return this.currentMP;
  }

  getMaxMP() {
    return this.maxMP;
  }

  getName() {
    return this.name;
  }

  getAttacked(damage) {
    this.currentHP -= damage - this.defense;
  }

  healAlly(toHeal = this) {}

  getActions() {
    return [
      {
        type: "attack",
        fn: () => {
          this.doAttack();
        },
      },
      {
        type: "heal",
        fn: () => {
          this.healAlly();
        },
      },
    ];
  }
}

module.exports = Character;
