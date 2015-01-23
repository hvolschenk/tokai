// the bash ability
// @param object game The game currently being played
// @param Object classType The class type that has this ability
function AbilityBash (game, classType) {

  // call the parent ability with this as reference
  BaseAbility.call(this, game, classType);
  // the ability type
  this.type = '';
  // this ability health cost
  this.healthCostBase = 0;
  // this ability mana cost
  this.manaCostBase = 0;
  // this ability stamina cost
  this.staminaCostBase = 0;
  // the health damage this ability does
  this.healthDamageBase = (function () {
    // 25% of max health
    return classType.damageCurrent;
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
  this.staminaGainBase = (function () {
    // 10% of maximum health
    return classType.damageCurrent;
  })();
  // the name of the ability
  this.name = 'Bash';
  // the description of this ability
  this.description = 'You deal base damage and gain base damage as stamina.';
  // the key assigned to this ability
  this.key = 65;
  
}

// this class extends the base ability class
AbilityBash.inheritsFrom(BaseAbility);