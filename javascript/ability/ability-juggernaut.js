// the juggernaut ability
// @param object game The game currently being played
// @param Object classType The class type that has this ability
function AbilityJuggernaut (game, classType) {
  
  // call the parent ability with this as reference
  BaseAbility.call(this, game, classType);
  // the ability type
  this.type = 'mana';
  // this ability health cost
  this.healthCostBase = 0;
  // this ability mana cost
  this.manaCostBase = 90;
  // this ability stamina cost
  this.staminaCostBase = 0;
  // the health damage this ability does
  this.healthDamageBase = (function () {
    // base damage plus 10% of max health
    return classType.damageCurrent + (classType.healthTotal * 0.2);
  })();
  // the mana damage that this ability does
  this.manaDamageBase = 0;
  // the stamina damage that this ability does
  this.staminaDamageBase = 0;
  // the amount of health gained from this ability
  this.healthGainBase = 0;
  // the amount of mana gained from this ability
  this.manaGainBase = 0;
  // the amount of stamina gained from this ability
  this.staminaGainBase = 0;
  // the name of the ability
  this.name = 'Juggernaut';
  // the description of this ability
  this.description = 'Base damage plus 20% of max health in damage.';
  // the key assigned to this ability
  this.key = 81;
  // the cooldown (in rounds) of this ability
  this.cooldown = 3;
  
};

// this class extends the base ability class
AbilityJuggernaut.inheritsFrom(BaseAbility);