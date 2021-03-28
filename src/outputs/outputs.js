function displayBattleInfo(heroes, enemies) {
  displayPartyInfo(enemies);
  console.log('--------------------------');
  displayPartyInfo(heroes);
}

function displayPartyInfo(party) {
  for (let [id, member] of Object.entries(party.getMembers())) {
    displayCharacterInfo(member);
  }
}

function displayCharacterInfo(character) {
  const name = `${character.getName()}: `;
  const health = `${character.getHealth()}/${character.getMaxHealth()} HP`;
  const magic = `${character.getMP()}/${character.getMaxMP()} MP\n`;
  
  console.log(name);
  console.log(health);
  console.log(magic);
}

module.exports = { displayBattleInfo, displayPartyInfo }