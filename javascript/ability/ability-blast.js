// the blast ability
// @param object game The game currently being played
// @param Object classType The class type that has this ability
function AbilityBlast (game, classType) {
  
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
    // base damage
    return classType.damageTotal;
  })();
  // the mana damage that this ability does
  this.manaDamageBase = 0;
  // the stamina damage that this ability does
  this.staminaDamageBase = 0;
  // the amount of health gained from this ability
  this.healthGainBase = 0;
  // the amount of mana gained from this ability
  this.manaGainBase = (function () {
    // 50% base damage
    return classType.damageTotal * 0.5;
  })();
  // the amount of stamina gained from this ability
  this.staminaGainBase = 0;
  // the name of the ability
  this.name = 'Blast';
  // the description of this ability
  this.description = 'You steal 50% of base damage mana back.';
  // the key assigned to this ability
  this.key = 65;
  
}

// this class extends the base ability class
AbilityBlast.inheritsFrom(BaseAbility);