const Enemy = require("../characters/Enemy");
const Party = require("./Party");

class EnemyParty extends Party {
  constructor(initialMembers) {
    super(initialMembers);
  }

  addToParty(newMembers) {
    const addSingleMemberToParty = (member) => {
      const id = Math.floor(Math.random() * 100000);

      this.members[id] = new Enemy(member);
    };

    if (Array.isArray(newMembers)) {
      newMembers.forEach((member) => {
        addSingleMemberToParty(member);
      });
    } else {
      addSingleMemberToParty(newMembers);
    }
  }
}

module.exports = EnemyParty;
