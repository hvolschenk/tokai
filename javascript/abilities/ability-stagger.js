// @param Object classType The class type that has this ability
function AbilityStagger (classType) {
  
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
  this.staminaCost = 30;
  // the health damage this ability does
  this.healthDamage = (function () {
    // base damage
    return classType.damageBase;
  })();
  // the mana damage that this ability does
  this.manaDamage = 0;
  // the stamina damage that this ability does
  this.staminaDamage = (function () {
    // base damage
    return classType.damageBase;
  })();
  // the amount of health gained from this ability
  this.healthGain = 0;
  // the amount of mana gained from this ability
  this.manaGain = 0;
  // the amount of stamina gained from this ability
  this.staminaGain = 0;
  // the name of the ability
  this.name = 'Stagger';
  // the description of this ability
  this.description = 'Do base damage to health and stamina.';
  // the key assigned to this ability
  this.key = 'R';
  
}