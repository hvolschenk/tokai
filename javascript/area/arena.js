// the arena
// @param Game game The game currently being played
// @param BaseClass opponent The opponent currently being fought
function Arena (game, opponent) {

  // call the parent class
  BaseObject.call(this, game);

  // set up the opponent
  this.opponent = opponent;
  // the width of the element
  this.width = 600;
  // the height of the element
  this.height = 600;
  // the image for this object
  this.image = 'images/area/arena/arena-background.jpg';
  // this image is a background image
  this.imageAsBackground = true;
  // the round indicator
  this.roundIndicator = $('<div class="roundIndicator"></div>');
  // the current round
  this.round = 0;
  // who's turn it currently is (true = player | false = opponent)
  this.playerTurn = true;

};

// this class extends base object
Arena.inheritsFrom(BaseObject);

// set a type for this class
Arena.prototype.type = 'arena';

// overwrites the parent initialize function
Arena.prototype.initialize = function () {
  // call the parent initialize function
  this.parent.initialize.call(this);
  // update the round indicator
  this.updateRoundIndicator();
};

// overwrites the parent addElement funtion
// @param htmlElement parentElement The parent element to append this one to
Arena.prototype.addElement = function (parentElement) {
  // call the parent initialize function
  this.parent.addElement.call(this, parentElement);
  // add the inner elements to this element
  this.addInnerElements();
};

Arena.prototype.addInnerElements = function () {
  // add the opponent to the arena
  this.opponent.addElement(this.element);
  // add a class to the opponent element
  this.opponent.element.addClass('opponent');
  // add the opponent statistics to the arena
  this.element.append(this.opponent.statistics.addClass('opponentBars'));
  // add the player element to the arena
  this.game.map.player.addElement(this.element);
  // add the player statistics to the arena
  this.element.append(this.game.map.player.statistics.addClass('playerBars'));
  // add the round indicator to the arena
  this.element.append(this.roundIndicator);
};

// updates the round indicator
Arena.prototype.updateRoundIndicator = function () {
  // the current round text element
  var roundText = $('<p></p>'),
  // the current round span
  currentRound = $('<span class="currentRound"></span>');
  // add the "round" text
  roundText.text('Round ');
  // add the current round to the round text
  roundText.append(currentRound);
  // add the round on the current round span
  currentRound.text(this.round);
  // add the current round to the indicator
  this.roundIndicator.empty().append(roundText);
};

// starts the fight
Arena.prototype.startFight = function () {
  // start the first round
  this.startRound();
};

// starts a round, giving the player a turn to cast an ability
Arena.prototype.startRound = function () {
  // increment the rounds counter
  this.round++;
  // update the round indicator
  this.updateRoundIndicator();
  // start the player's turn
  this.startPlayerTurn();
};

// start the player's turn for casting an ability
Arena.prototype.startPlayerTurn = function () {
  // highlight the player's statistics element
  this.game.map.player.statistics.addClass('active');
  // set up the events for the arena (the player's abilities)
  this.setupEvents();
};

// start the opponent's turn
Arena.prototype.startOpponentTurn = function () {
  // the ability that the opponent will cast
  var ability = this.opponent.chooseAbilityToCast();
  // initialize the ability
  ability.initialize();
  // add the active class to the opponent's statistics element
  this.opponent.statistics.addClass('active');
  // cast the ability
  ability.tryCast(this.game.map.player);
};

// end the current turn
Arena.prototype.endTurn = function () {
  // a reference to this object
  var self = this;
  // set who's turn it is now
  this.playerTurn = !this.playerTurn;
  // check if the fight is over
  if (this.checkForFightEnd() === false) {
    // wait a second
    window.setTimeout(function () {
      // remove the ability element from the arena
      self.element.find('.ability.grayArea').remove();
      // check who's turn must end
      if (self.playerTurn === false) {
        // end the player's turn
        self.endPlayerTurn();
        // start the opponent's turn
        self.startOpponentTurn();
      } else {
        // end the opponent turn
        self.endOpponentTurn();
        // start a new round
        self.startRound();
      }
    }, 1500);
  }
};

// ends the player's turn in the current round
Arena.prototype.endPlayerTurn = function () {
  // remove the highlight from the player's statistics element
  this.game.map.player.statistics.removeClass('active');
};

// ends the opponent's turn in the current round
Arena.prototype.endOpponentTurn = function () {
  // remove the highlight from the opponent's statistics element
  this.opponent.statistics.removeClass('active');
};

// overwrites the parent setupEvents method
Arena.prototype.setupEvents = function () {
  // call the parent setupEvents method
  this.parent.setupEvents.call(this);
  // go through each of the class abilities to add events to that
  $.each(this.game.map.player.abilities, function (index, value) {
    // add events for the specific ability
    value.setupEvents();
  });
};

Arena.prototype.checkForFightEnd = function () {
  // check if the player has died
  if (this.game.map.player.healthCurrent <= 0 || this.opponent.healthCurrent <= 0) {
    // end the fight
    this.game.endFight();
    // return true, the fight has ended
    return true;
  } else {
    // return false, the fight has not ended
    return false;
  }
};