/**
 * The family heirloom quest
 * @param {Game} game The game currently being played
 */
function QuestFamilyBusiness (game) {
  
  // call the parent object
  BaseQuest.call(this, game);
  
  // the name of this quest
  this.name = 'Family Business';
  // a short description of this quest
  this.description = 'A local man (Josh Hartman) has lost his family heirloom, a sword. I must go retreive it from the bandits for him.';
  // the reward in gold for completing this quest
  this.rewardGold = 10;
  // all the phases required to complete this quest
  this.phases = ['Kill the bandit leader', 'Get the sword from the bandit leader', 'Bring the sword to Josh Hartman'];
  
};

// this quest extends base object
QuestFamilyBusiness.inheritsFrom(BaseQuest);

// the type of this object
QuestFamilyBusiness.prototype.type = 'familybusiness';

// updates the current quest phase
QuestFamilyBusiness.prototype.updatePhase = function () {
  // find the bandit leader
  var banditLeader = this.game.map.findObject('name', 'Susan Baker'),
  // the heirloom inside the inventory
  inventoryHeirloom = this.game.map.player.inventory.findItem('name', 'Axe');
  // see if the bandit leader has been killed
  if (banditLeader.dead === true) {
    // see if the player is holding the heirloom item
    if (inventoryHeirloom !== undefined) {
      // we need to take the sword to Josh
      this.phase = 2;
    } else {
      // we still need to get the sword
      this.phase = 1;
    }
  } else {
    // we still need to kill the leader
    this.phase = 0;
  }
};