// @param Object classType The class type that has this ability
function AbilitySyphon (classType) {
  
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
  this.staminaCost = 90;
  // the health damage this ability does
  this.healthDamage = 0;
  // the mana damage that this ability does
  this.manaDamage = 0;
  // the stamina damage that this ability does
  this.staminaDamage = 0;
  // the amount of health gained from this ability
  this.healthGain = 0;
  // the amount of mana gained from this ability
  this.manaGain = (function () {
    // 50% max stamina
    return classType.staminaBase * 0.5;
  })();
  // the amount of stamina gained from this ability
  this.staminaGain = 0;
  // the name of the ability
  this.name = 'Syphon';
  // the description of this ability
  this.description = 'Syphon 50% of your max stamina as mana.';
  // the key assigned to this ability
  this.key = 'E';
  
}