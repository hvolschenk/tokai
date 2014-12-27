// @param Object classType The class type that has this ability
function AbilityJuggernaut (classType) {
  
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
  this.healthDamage = (function () {
    // 25% of max health
    return classType.healthTotal * 0.25;
  })();
  // the mana damage that this ability does
  this.manaDamage = 0;
  // the stamina damage that this ability does
  this.staminaDamage = 0;
  // the amount of health gained from this ability
  this.healthGain = (function () {
    // 10% of maximum health
    return classType.healthTotal * 0.1;
  })();
  // the amount of mana gained from this ability
  this.manaGain = 0;
  // the amount of stamina gained from this ability
  this.staminaGain = 0;
  // the name of the ability
  this.name = 'Juggernaut';
  // the description of this ability
  this.description = 'You deal base damage plus 10% of max health in damage.';
  // the key assigned to this ability
  this.key = 'Q';
  
}