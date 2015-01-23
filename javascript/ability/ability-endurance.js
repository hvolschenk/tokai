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
  this.healthDamageBase = classType.damageBase * 1.5;
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
  this.name = 'Endurance';
  // the description of this ability
  this.description = 'Deal 150% base damage.';
  // the key assigned to this ability
  this.key = 87;
  // the cooldown (in rounds) of this ability
  this.cooldown = 4;
  // a list of passives for this ability
  this.passiveList = [PassiveTough];
  
};

// this class extends the base ability class
AbilityEndurance.inheritsFrom(BaseAbility);