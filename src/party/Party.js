class Party {
  constructor(initialMembers) {
    initialMembers = initialMembers || null;

    this.members = {};

    if (initialMembers) {
      this.addToParty(initialMembers);
    }
  }

  // Private
  getMembers() {
    return this.members;
  }

  getIds() {
    let memberIds = [];

    for (let [id] of Object.entries(this.members)) {
      memberIds.push(id);
    }
    return memberIds;
  }
}

module.exports = Party;
