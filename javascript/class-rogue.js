function ClassRogue () {
  
  // a reference to this class
  var self;
  
  // extend this object with the base object
  BaseClass.call(this);

  // the character name
  this.characterName = '';
  // this class''s name
  this.name = 'Rogue';
  // the images for this class
  this.images = {
    front : '/images/characters/rogue-front.png',
    back  : '/images/characters/rogue-back.png'
  };
  // the base attack damage for this class
  this.baseAttackDamage = 20;
  // the mana cost for the first magic ability
  this.manaOneCost = 90;
  // the mana cost for the second magic ability
  this.manaTwoCost = 90;
  // the stamina cost for the first stamina ability
  this.staminaOneCost = 30;
  // the stamina cost for the second stamina ability
  this.staminaTwoCost = 30;
  // the base health for this class type
  this.baseHealth = 100;
  // the base mana for this class type
  this.baseMana = 200;
  // the base stamina for this class type
  this.baseStamina = 300;
  // the base amount of armor for this class type
  this.baseArmor = 1;
  // the lore story for this class type
  this.lore = ' grew up in the streets of the capital, from a young age he had to learn to feed and fend for him self, he leart to be a master in the shadows, never knowing love or compassion until he met a compassionate girl which he fell in love with, until that one day the big accident happened.';
  // the description of this class type''s auto attack
  this.autoAttackDescription = 'You steal 50% of base damage stamina back from auto attacks.';
  // the name of this class''s firt mana ability
  this.manaOneName = 'Stealthy assassin';
  // the description of the first mana ability
  this.manaOneDescription = 'Go invisible for one round. Do 200% damage with an auto-attack.';
  // the name of the second mana ability
  this.manaTwoName = 'Exchange';
  // the description of the second mana ability
  this.manaTwoDescription = 'Convert 50% of the mana used into health.';
  // the name of the first stamina ability
  this.staminaOneName = 'Critical strike';
  // the description of the first stamina ability
  this.staminaOneDescription = 'Your attack critically strikes and does 300% base damage.';
  // the name of the second stamina ability
  this.staminaTwoName = 'Mine now';
  // the description of the second stamina ability
  this.staminaTwoDescription = 'Steal 20 health from the Enemy.';
  
  // perform a basic attack on the enemy
  // @param Object enemy The enemy being attacked
  this.performAutoAttack = function (enemy) {
    // the amount of stamina to steal back
    var staminaAmount = self.baseAttackDamage * 0.5;
    // change the enemy health
    enemy.takeDamage(self.baseAttackDamage);
    // recover stamina
    self.gainStamina(staminaAmount);
  };
  
  // perform your first mana ability
  // @param Object enemy The enemy the ability is being performed on
  this.performManaOne = function (enemy) {
    // remove your mana for this ability
    self.useMana(self.manaOneCost);
    // damage the enemy for auto-attack damage times two
    enemy.takeDamage(self.baseAttackDamage * 2);
  };

  // perform your second mana ability
  // @param Object enemy The enemy the ability is being performed on
  this.performManaTwo = function (enemy) {
    // the amount of health to gain
    var healthAmount = self.manaTwoCost * 0.5;
    // remove your mana for this ability
    self.useMana(self.manaTwoCost);
    // gain health
    self.gainHealth(healthAmount);
  };
  
  
  
  
  
  
  
  
  
  
  
  
  // perform your first stamina ability
  // @param Object enemy The enemy the ability is being performed on
  this.performStaminaOne = function (enemy) {
    // the amount of damage to do
    var damageAmount = self.baseAttackDamage * 3;
    // remove your mana for this ability
    self.useStamina(self.staminaOneCost);
    // gain health
    enemy.takeDamage(damageAmount);
  };
  
  // perform your second stamina ability
  // @param Object enemy The enemy the ability is being performed on
  this.performStaminaTwo = function (enemy) {
    // the amount of damage to do
    var damageAmount = 20;
    // remove your mana for this ability
    self.useStamina(self.staminaTwoCost);
    // damage enemy
    enemy.takeDamage(damageAmount);
    // gain health
    self.gainHealth(damageAmount);
  };
  
  
  
  
  
  
  
  
  

  // set the reference to this class
  self = this;

}