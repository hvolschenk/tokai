function EnemyShadowling (map) {

  // a reference to this object
  var self = this;
  
  // extend this object with the base object
  BaseEnemy.call(this, map);
  
  // the enemy Shadowling image
  this.image = '/images/enemy.png';
  // the enemy dead image
  this.imageDead = '/images/enemy-dead.png';
  // set the enemy name
  this.name = 'Shadowling';
  // the base attack damage for this class
  this.damageBase = 20;
  // the mana cost for the first magic ability
  // set the base health of the Shadowling
  this.healthBase = 300;
  // the current health of the enemy
  this.healthCurrent = 300;
  // set the base mana of a Shadowling
  this.manaBase = 100;
  // the current mana of the enemy
  this.manaCurrent = 100;
  // set the base stamina of a Shadowling
  this.staminaBase = 200;
  // the currrent stamina of the enemy
  this.staminaCurrent = 200;
  // the base amount of armor for this class type
  this.armorBase = 1;
  // the lore story for this class type
  this.lore = 'A stinky creature from the wasteland';
  // the abilities for this enemy
  this.abilities = [
    // auto attack
    new AbilityAutoAttack(self),
    // first mana ability
    new AbilityShadowSlash(self),
    // first stamina ability
    new AbilityHowlingGale(self)
  ];

}