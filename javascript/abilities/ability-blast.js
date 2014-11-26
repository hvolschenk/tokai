// @param Object classType The class type that has this ability
function AbilityBlast (classType) {
  
  // a reference to this class
  var self = this;
  
  // extend the base ability class
  BaseAbility.call(this, classType);
  
  // the ability type
  this.type = '';
  // this ability health cost
  this.healthCost = 0;
  // this ability mana cost
  this.manaCost = 0;
  // this ability stamina cost
  this.staminaCost = 0;
  // the health damage this ability does
  this.healthDamage = (function () {
    // base damage
    return classType.damageBase;
  })();
  // the mana damage that this ability does
  this.manaDamage = 0;
  // the stamina damage that this ability does
  this.staminaDamage = 0;
  // the amount of health gained from this ability
  this.healthGain = 0;
  // the amount of mana gained from this ability
  this.manaGain = (function () {
    // 50% base damage
    return classType.damageBase * 0.5;
  })();
  // the amount of stamina gained from this ability
  this.staminaGain = 0;
  // the name of the ability
  this.name = 'Blast';
  // the description of this ability
  this.description = 'You steal 50% of base damage mana back.';
  // the key assigned to this ability
  this.key = 'A';
  
}