function EnemyShadowling (map) {

  // a reference to this object
  var self;
  
  // extend this object with the base object
  BaseEnemy.call(this, map);
  
  // the enemy Shadowling image
  this.image = '/images/enemy.png';
  // set the enemy name
  this.name = 'Shadowling';
  

  // the base attack damage for this class
  this.baseAttackDamage = 5;
  // the mana cost for the first magic ability
  this.manaOneCost = 90;
  // the mana cost for the second magic ability
  this.manaTwoCost = 90;
  // the stamina cost for the first stamina ability
  this.staminaOneCost = 30;
  // the stamina cost for the second stamina ability
  this.staminaTwoCost = 30;
  // set the base health of the Shadowling
  this.baseHealth = 300;
  // set the base mana of a Shadowling
  this.baseMana = 100;
  // set the base stamina of a Shadowling
  this.baseStamina = 200;
  // the base amount of armor for this class type
  this.baseArmor = 1;
  // the lore story for this class type
  this.lore = 'A stinky creature from the wasteland';
  // the description of this class type''s auto attack
  this.autoAttackDescription = 'Does not hit very hard';
  // the name of this class''s firt mana ability
  this.manaOneName = 'Shadow slash';
  // the description of the first mana ability
  this.manaOneDescription = 'One auto-attack, follwed by another of 50% damage.';
  // the name of the first stamina ability
  this.staminaOneName = 'Howling gale';
  // the description of the first stamina ability
  this.staminaOneDescription = 'A nuke that does 25 damage.';

  // set the reference to this object
  self = this;

}