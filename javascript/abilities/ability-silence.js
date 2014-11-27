// @param Object classType The class type that has this ability
function AbilitySilence (classType) {
  
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
  this.healthDamage = (function () {
    // base damage
    return classType.damageBase * 1.5;
  })();
  // the mana damage that this ability does
  this.manaDamage = (function () {
    // base damage
    return classType.damageBase * 1.5;
  })();
  // the stamina damage that this ability does
  this.staminaDamage = (function () {
    // base damage
    return classType.damageBase * 1.5;
  })();
  // the amount of health gained from this ability
  this.healthGain = 0;
  // the amount of mana gained from this ability
  this.manaGain = 0;
  // the amount of stamina gained from this ability
  this.staminaGain = 0;
  // the name of the ability
  this.name = 'Silence';
  // the description of this ability
  this.description = 'Deal 150% base damage to health, mana and stamina.';
  // the key assigned to this ability
  this.key = 'Q';
  
}