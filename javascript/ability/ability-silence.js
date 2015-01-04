// the silence ability
// @param object game The game currently being played
// @param Object classType The class type that has this ability
function AbilitySilence (game, classType) {

  // call the parent ability with this as reference
  BaseAbility.call(this, game, classType);
  // the ability type
  this.type = 'mana';
  // this ability health cost
  this.healthCostBase = 0;
  // this ability mana cost
  this.manaCostBase = 70;
  // this ability stamina cost
  this.staminaCostBase = 0;
  // the health damage this ability does
  this.healthDamageBase = (function () {
    // base damage
    return classType.damageTotal * 1.5;
  })();
  // the mana damage that this ability does
  this.manaDamageBase = (function () {
    // base damage
    return classType.damageTotal * 1.5;
  })();
  // the stamina damage that this ability does
  this.staminaDamageBase = (function () {
    // base damage
    return classType.damageTotal * 1.5;
  })();
  // the amount of health gained from this ability
  this.healthGainBase = 0;
  // the amount of mana gained from this ability
  this.manaGainBase = 0;
  // the amount of stamina gained from this ability
  this.staminaGainBase = 0;
  // the name of the ability
  this.name = 'Silence';
  // the description of this ability
  this.description = 'Deal 150% base damage to health, mana and stamina.';
  // the key assigned to this ability
  this.key = 81;
  
};

// this class extends the base ability class
AbilitySilence.inheritsFrom(BaseAbility);