class Party {
  constructor(initialMembers) {
    initialMembers = initialMembers || null;

    this.members = {}

    if (initialMembers) {
      this.addToParty(initialMembers);
    }
  }

  // Private

  getMembers() {
    return this.members;
  }
}

module.exports = Party;