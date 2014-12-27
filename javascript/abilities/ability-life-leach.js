// @param Object classType The class type that has this ability
function AbilityLifeLeach (classType) {
  
  // a reference to this class
  var self = this;
  
  // extend the base ability class
  BaseAbility.call(this, classType);
  
  // the ability type
  this.type = 'stamina';
  // this ability health cost
  this.healthCost = 0;
  // this ability mana cost
  this.manaCost = 0;
  // this ability stamina cost
  this.staminaCost = 70;
  // the health damage this ability does
  this.healthDamage = (function () {
    // base damage
    return classType.damageTotal;
  })();
  // the mana damage that this ability does
  this.manaDamage = 0;
  // the stamina damage that this ability does
  this.staminaDamage = 0;
  // the amount of health gained from this ability
  this.healthGain = (function () {
    // base damage
    return classType.damageTotal;
  })();
  // the amount of mana gained from this ability
  this.manaGain = 0;
  // the amount of stamina gained from this ability
  this.staminaGain = 0;
  // the name of the ability
  this.name = 'Life Leach';
  // the description of this ability
  this.description = 'Steal your base damage in health from the enemy.';
  // the key assigned to this ability
  this.key = 'R';
  
}