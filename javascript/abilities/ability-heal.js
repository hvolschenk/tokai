// @param Object classType The class type that has this ability
function AbilityHeal (classType) {
  
  // a reference to this class
  var self = this;
  
  // extend the base ability class
  BaseAbility.call(this, classType);
  
  // the ability type
  this.type = 'mana';
  // this ability health cost
  this.healthCost = 0;
  // this ability mana cost
  this.manaCost = 30;
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
    // 20% of max health
    return classType.healthBase * 0.2;
  })();
  // the amount of mana gained from this ability
  this.manaGain = 0;
  // the amount of stamina gained from this ability
  this.staminaGain = 0;
  // the name of the ability
  this.name = 'Heal';
  // the description of this ability
  this.description = 'Heal yourself for 20% of your max health.';
  // the key assigned to this ability
  this.key = 'W';
  
}