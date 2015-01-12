// the base ability that all other abilities extend
// @param object game The game currently being played
// @param Object classType The class type that has this ability
function BaseAbility (game, classType) {

  // call the parent class
  BaseObject.call(this, game);

  // the width of an ability element
  this.width = 280;
  // the class type that this ability belongs to
  this.classType = classType;
  // do not show the level indicator on abilities
  this.showLevel = false;
  // the cooldown (in rounds) of this ability
  this.cooldown = 1;
  // for how many rounds of cooldown does this ability
  // have left before it can be cast again
  this.onCooldown = 0;

};

// this class extends the base object class
BaseAbility.inheritsFrom(BaseObject);

// give this class a type
BaseAbility.prototype.type = 'ability';

// overwrite the parent initialize function
BaseAbility.prototype.initialize = function () {
  // initialize the item's level
  this.initializeLevel();
  // call the parent's initialize
  this.parent.parent.initialize.call(this);
  // get the costs and damage for this ability
  this.initializeStatistics();
};

// overwrites the parent addElement function
// @param htmlElement parentElement The parent element to append this one to
BaseAbility.prototype.addElement = function (parentElement) {
  // call the parent addElement method
  this.parent.parent.addElement.call(this, parentElement);
  // add the inner elements to this one
  this.addInnerElements();
};

// update's the element
BaseAbility.prototype.updateElement = function () {
  // call the parent updateElement method
  this.parent.parent.updateElement.call(this);
  // add the inner elements to thi element
  this.addInnerElements();
};

// overwrite the parent setupEvents method
BaseAbility.prototype.setupEvents = function () {
  // holds the key for this ability
  var key = this.key;
  // set up the event for this ability
  this.events[this.key] = this.tryCast;
  // call the parent function
  this.parent.parent.setupEvents.call(this);
};

// get the cost and damage for this ability
BaseAbility.prototype.initializeStatistics = function () {
  // a reference to this ability
  var self = this;
  // a list of statistics to build
  var statisticsToBuild = [
    'healthCost', 'manaCost', 'staminaCost',
    'healthDamage', 'manaDamage', 'staminaDamage',
    'healthGain', 'manaGain', 'staminaGain',
    'damage', 'armor'
  ];
  // go through each statistic
  $.each(statisticsToBuild, function () {
    // the modifier for this statistic
    var modifier = self[this + 'Modifier'] || 1;
    // scale the statistic accordingly
    self[this] = modifier * self[this + 'Base'];
  });
};

// add the inner elements to the element
BaseAbility.prototype.addInnerElements = function () {
  // the key to press for this ability
  var keyboardKey = $('<div class="keyboardKey"></div>'),
  // a description of the ability
  name = $('<p></p>'),
  // an indication of what the ability costs
  costIndicator = $('<span class="cost"></span>'),
  // the description of the ability
  description = $('<span class="description"></span>'),
  // the cooldown indicator element
  cooldownIndicator = $('<div class="cooldown roundedCorners grayArea"></div>');
  // set the correct keyboard key
  keyboardKey.html(String.fromCharCode(this.key).toUpperCase());
  // check whether the ability is on cooldown
  if (this.isOnCooldown() === true) {
    // add the cooldown rounds text amount to the element
    cooldownIndicator.text(this.onCooldown);
    // add the cooldown indicator to the key
    keyboardKey.append(cooldownIndicator);
  }
  // set the name
  name.html(this.name + ':');
  // set the description
  description.html(this.description);
  // add the key, description and cost to the description element
  this.element.empty().append(keyboardKey, name);
  // check if a type is defined
  if (this.type !== '') {
    // add the cost class and value
    costIndicator.html(this[this.type + 'Cost']).addClass(this.type);
    // add the cost indicator to the ability description element
    name.append(costIndicator);
  }
  // add the description
  name.append('<br />', description);
};

// try and cast an ability
BaseAbility.prototype.tryCast = function () {
  // see if we are allowed to cast the ability
  if (this.allowedToCast() === true) {
    // cast this ability
    this.cast();
  }
};

// cast the ability
BaseAbility.prototype.cast = function () {
  // the class to append to the ability element
  var abilityClass = this.game.arena.playerTurn === true ? '' : 'opponent';
  // set the cooldown of this ability
  this.onCooldown = this.cooldown;
  // update the player/opponent statistics
  this.updateStatistics();
  // re-build the player statistics
  this.game.map.player.buildStatistics(true);
  // re-build the opponent statistics
  this.game.arena.opponent.buildStatistics(true);
  // add the ability element to the arena
  this.game.arena.element.append(this.element.clone().addClass('roundedCorners grayArea').addClass(abilityClass));
  // see if the player is playing
  if (this.game.arena.playerTurn === true) {
    // remove all events from the arena (so the player cannot cast)
    this.game.arena.removeEvents();
  }
  // end the turn
  this.game.arena.endTurn();
  // update the element
  this.initialize();
};

// updates the new health/mana/stamina etc when an ability is casted
BaseAbility.prototype.updateStatistics = function () {
  // the opponent for this ability
  var opponent = (this.game.arena.playerTurn === true) ? this.game.arena.opponent : this.game.map.player;
  // remove the health cost from the class type health
  this.classType.loseResource('health', this.healthCost);
  // remove the mana cost from the class type mana
  this.classType.loseResource('mana', this.manaCost);
  // remove the stamina cost from the class type stamina
  this.classType.loseResource('stamina', this.staminaCost);
  // do health damage to the opponent
  opponent.loseResource('health', this.healthDamage);
  // do mana damage to the opponent
  opponent.loseResource('mana', this.manaDamage);
  // do stamina damage to the opponent
  opponent.loseResource('stamina', this.staminaDamage);
  // gain health
  this.classType.gainResource('health', this.healthGain);
  // gain mana
  this.classType.gainResource('mana', this.manaGain);
  // gain stamina
  this.classType.gainResource('stamina', this.staminaGain);
};

// check if the ability is allowed to be casted
BaseAbility.prototype.allowedToCast = function () {
  // a reference to this ability
  var self = this;
  // the resources to check for
  var resources = ['health', 'mana', 'stamina'],
  // whether or not the test failed
  allowedToCast = true;
  // check whether the ability is on cooldown
  if (this.isOnCooldown() === true) {
    // fail the test, the ability is still on cooldown
    allowedToCast = false;
  }
  // go through each of the resources
  $.each(resources, function () {
    // check if the resource cost of this ability is higher than the owned amount
    if (self.classType[this + 'Current'] - self[this + 'Cost'] < 0) {
      // fail the test, this ability cannot be cast
      allowedToCast = false;
    }
  });
  // return the result
  return allowedToCast;
};

// whether the ability is on cooldown or not
BaseAbility.prototype.isOnCooldown = function () {
  // check how many rounds of cooldown is left
  return (this.onCooldown === 0) ? false : true;
};

// end the round, update cooldowns and apply passives
BaseAbility.prototype.endRound = function () {
  // lower the cooldown
  this.onCooldown = (this.onCooldown > 0) ? this.onCooldown - 1 : 0;
  // re-initialize the ability
  this.updateElement();
};