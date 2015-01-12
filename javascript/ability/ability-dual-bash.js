// the dual bash ability
// @param object game The game currently being played
// @param Object classType The class type that has this ability
function AbilityDualBash (game, classType) {

  // call the parent ability with this as reference
  BaseAbility.call(this, game, classType);
  // the ability type
  this.type = 'stamina';
  // this ability health cost
  this.healthCostBase = 0;
  // this ability mana cost
  this.manaCostBase = 0;
  // this ability stamina cost
  this.staminaCostBase = 70;
  // the health damage this ability does
  this.healthDamageBase = (function () {
    // base damage times two
    return classType.damageTotal * 2;
  })();
  // the mana damage that this ability does
  this.manaDamageBase = 0;
  // the stamina damage that this ability does
  this.staminaDamageBase = 0;
  // the amount of health gained from this ability
  this.healthGainBase = (function () {
    // 10% of maximum health
    return classType.damageTotal;
  })();
  // the amount of mana gained from this ability
  this.manaGainBase = 0;
  // the amount of stamina gained from this ability
  this.staminaGainBase = 0;
  // the name of the ability
  this.name = 'Dual Bash';
  // the description of this ability
  this.description = 'Bash [A] twice, gain health instead of stamina.';
  // the key assigned to this ability
  this.key = 69;
  // the cooldown (in rounds) of this ability
  this.cooldown = 3;
  
};

// this class extends the base ability class
AbilityDualBash.inheritsFrom(BaseAbility);