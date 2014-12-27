// @param Object classType The class type that has this ability
function AbilityExchange (classType) {
  
  // a reference to this class
  var self = this;
  
  // extend the base ability class
  BaseAbility.call(this, classType);
  
  // the ability type
  this.type = 'mana';
  // this ability health cost
  this.healthCost = 0;
  // this ability mana cost
  this.manaCost = 90;
  // this ability stamina cost
  this.staminaCost = 0;
  // the health damage this ability does
  this.healthDamage = 0;
  // the mana damage that this ability does
  this.manaDamage = 0;
  // the stamina damage that this ability does
  this.staminaDamage = 0;
  // the amount of health gained from this ability
  this.healthGain = (function () {
    // 30% of max health
    return classType.healthTotal * 0.3;
  })();
  // the amount of mana gained from this ability
  this.manaGain = 0;
  // the amount of stamina gained from this ability
  this.staminaGain = 0;
  // the name of the ability
  this.name = 'Exchange';
  // the description of this ability
  this.description = 'Gain 30% of your maximum health back.';
  // the key assigned to this ability
  this.key = 'W';
  
}