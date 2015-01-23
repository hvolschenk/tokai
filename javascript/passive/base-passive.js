/**
 * The base passive class
 * @param {Object} game The game currently being played
 * @param {Object} ability The ability this passive belongs to
 */
function BasePassive (game, ability) {
  
  // call the parent class
  BaseObject.call(this, game);

  // the game of the passive
  this.game = game;
  // the ability this passive belongs to
  this.ability = ability;
  // whether this passive is always on
  this.alwaysOn = false;
  // the amount of rounds this passive lasts
  this.rounds = 0;
  // how many rounds are left
  this.roundsLeft = 0;

};

// This class is a child of BaseObject
BasePassive.inheritsFrom(BaseObject);

// the type of this clas
BasePassive.prototype.type = 'passive';

/**
 * Overwrites the parent initialize method
 */
BasePassive.prototype.initialize = function () {
  // update how many rounds are left
  this.roundsLeft = this.rounds;
  // call the parent initialize method
  this.parent.parent.initialize.call(this);
};

/**
 * Builds the element for the passive
 */
BasePassive.prototype.updateElement = function () {
  // call the parent updateElement method
  this.parent.parent.updateElement.call(this);
  // add the inner elements for this element
  this.addInnerElements();
  // add the correct classes to the element
  this.element.addClass('grayArea roundedCorners');
};

/**
 * Adds the inner elements to this elements
 */
BasePassive.prototype.addInnerElements = function () {
  // the name of the passive
  var name = $('<p class="name">' + this.name + '</p>'),
  // the description of the passive
  description = $('<p class="description">' + this.description + '</p>'),
  // the indicator showing how many rounds are left
  rounds = $('<div class="rounds">' + this.roundsLeft + '</div>');
  // empty the element
  this.element.empty();
  // add the rounds indicator to the element
  this.element.append(rounds);
  // add the name to the element
  this.element.append(name);
  // add the description to the element
  this.element.append(description);
};

/**
 * Applies the passive to it's target
 */
BasePassive.prototype.applyPassive = function () {
  // the opponent for this passive
  var opponent = (this.game.arena.playerTurn === true) ? this.game.arena.opponent : this.game.map.player,
  // a list of statistic types to gain/lose
  statisticTypes = ['health', 'mana', 'stamina'],
  // a reference to this class
  self = this;
  // go through each statistic to gain
  $.each(statisticTypes, function (index, value) {
    // let the class type gain this statistic
    self.ability.classType.gainResource(value, self[value + 'Gain'] || 0);
    // let the opponent lose this statistic
    opponent.loseResource(value, self[value + 'Damage'] || 0);
  });
  // update the player's statistics
  this.ability.classType.buildStatistics(true);
  // update the opponent's statistics
  opponent.buildStatistics(true);
  // lower the current amount of rounds left
  this.roundsLeft--;
  // update the element so the rounds left reflects to the player
  this.updateElement();
};

/**
 * Removes the passive from it's target, remove any effects it could have caused
 */
BasePassive.prototype.finish = function () {};