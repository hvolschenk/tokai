// the endurance ability
// @param object game The game currently being played
// @param Object classType The class type that has this ability
function AbilityEndurance (game, classType) {

  // a reference to this class
  var self = this;

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
  this.healthDamageBase = 0;
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
    // gain stamina equal to the cast cost
    return self.manaCostBase;
  })();
  // the name of the ability
  this.name = 'Endurance';
  // the description of this ability
  this.description = 'Gain stamina equal to the mana cost of this ability.';
  // the key assigned to this ability
  this.key = 87;
  // the cooldown (in rounds) of this ability
  this.cooldown = 3;
  
};

// this class extends the base ability class
AbilityEndurance.inheritsFrom(BaseAbility);