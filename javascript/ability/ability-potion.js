// an ability for drinking equipped potion
// @param object game The game currently being played
// @param Object classType The class type that has this ability
function AbilityPotion (game, classType) {
  
  // call the parent ability with this as reference
  BaseAbility.call(this, game, classType);
  // the ability type
  this.type = 'potion';
  // this ability health cost
  this.healthCostBase = 0;
  // this ability mana cost
  this.manaCostBase = 0;
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
  this.staminaGainBase = 0;
  // the name of the ability
  this.name = 'Potion';
  // the description of this ability
  this.description = 'Drink equipped potion.';
  // the key assigned to this ability
  this.key = 49;
  
}

// this class extends the base ability class
AbilityPotion.inheritsFrom(BaseAbility);

// overwrites the tryCast method
AbilityPotion.prototype.tryCast = function () {
  // see if a potion is equipped
  if (this.game.map.player.inventory.potion === undefined) {
    // this ability cannot be cast
    return false;
  } else {
    // this ability can be cast, go on
    this.parent.tryCast.call(this);
  }
};

// overwrite the cast method
AbilityPotion.prototype.cast = function () {
  // a list of resource types to check
  var resourceTypes = ['health', 'mana', 'stamina'],
  // a reference to this class
  self = this;
  // go through each resource type
  $.each(resourceTypes, function (index, value) {
    // gain this resource type
    self.classType.gainResource(value, self.game.map.player.inventory.potion[value]);
  });
  // remove the potion
  this.game.map.player.inventory.potion = undefined;
  // rebuild the player's ability list
  this.game.map.player.buildAbilities();
  // call the parent cast method
  this.parent.cast.call(this);
};