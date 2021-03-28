const Hero = require('../characters/Hero');
const Party = require('./Party');

class HeroParty extends Party {
  constructor(initialMembers) {
    super(initialMembers);
  }

  // Private
  addToParty(newMembers) {
    const addSingleMemberToParty = member => {
      const id = Math.floor(Math.random() * 100000);

      this.members[id] = new Hero(member);
    }

    if (Array.isArray(newMembers)) {
      newMembers.forEach(member => {
        addSingleMemberToParty(member);
      });
    } else {
      addSingleMemberToParty(newMembers);
    }
  }
}

module.exports = HeroParty;