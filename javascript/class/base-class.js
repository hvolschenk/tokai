// all class types
// @param Game game The game that is currently being played
function BaseClass (game) {

  // call the parent class
  BaseObject.call(this, game);

  // the main image for all classes
  this.currentImage = 2;
  // has a level
  this.level = 1;
  // the list that holds the class statistics
  this.statistics = $('<div class="bars roundedCorners grayArea"></div>');
  // the element that holds the abilities
  this.abilityListElement = $('<div class="abilityList"></div>');
  // a list of instantiated abilities
  this.abilities = [];
  // a list of events for this class
  this.events = {
    '37' : this.moveLeft,
    '38' : this.moveUp,
    '39' : this.moveRight,
    '40' : this.moveDown
  };
  // the inventory for this class
  this.invetory;
  // the dead image for this class
  this.imageDead = 'images/class/dead.png';

};

// this class extends the base object class
BaseClass.inheritsFrom(BaseObject);

// the type for this class
BaseClass.prototype.type = 'class';

// an initialization function for the object
BaseClass.prototype.initialize = function () {
  // get the level of this class
  this.initializeLevel();
  // call the parent initialize method
  this.parent.parent.initialize.call(this);
  // initialize the statistics for this class
  this.initializeStatistics();
  // build the statistics element for this class
  this.buildStatistics();
  // initialize the abilities for this class
  this.initializeAbilities();
  // build the abilities list
  this.buildAbilities();
  // initialize the class's inventory
  this.initializeInventory();
};

// initializes the inventory
BaseClass.prototype.initializeInventory = function () {
  // check whether this class has an inventory
  if (this.inventory instanceof Inventory === false) {
    // set up a new inventory for this class
    this.inventory = new Inventory(this.game);
    // initialize the inventory
    this.inventory.initialize();
  }
};

// initializes current and total health/mana/stamina etc
BaseClass.prototype.initializeStatistics = function () {
  // a reference to this fighter
  var self = this;
  // a list of statistics to build
  var statisticsToBuild = ['health', 'mana', 'stamina', 'damage'];
  // go through each statistic
  $.each(statisticsToBuild, function () {
    // the modifier for this statistic
    var modifier = self[this + 'Modifier'] || 1;
    // scale the statistic accordingly
    self[this + 'Current'] = (self.level * modifier) * self[this + 'Base'];
    self[this + 'Total'] = (self.level * modifier) * self[this + 'Base'];
  });
};

// a function to show the statistics of a class type
// @param Boolean showName Whether to add in the character name
BaseClass.prototype.buildStatistics = function (showName) {
  // the health bar element
  var barHealth = $('<div class="bar roundedCorners grayArea health"></div>'),
  // the mana bar element
  barMana = $('<div class="bar roundedCorners grayArea mana"></div>'),
  // the stamina bar element
  barStamina = $('<div class="bar roundedCorners grayArea stamina"></div>'),
  // an empty div to append th each bar
  emptyDiv = $('<div></div>'),
  // an empty paragraph tag
  emptyParagraph = $('<p></p>'),
  // the percentage of the health bar
  healthPercentage = (this.healthCurrent / this.healthTotal) * 100,
  // the percentage of the mana bar
  manaPercentage = (this.manaCurrent / this.manaTotal) * 100,
  // the percentage of the stamina bar
  staminaPercentage = (this.staminaCurrent / this.staminaTotal) * 100,
  // the name to show
  name = (this.characterName !== undefined) ? this.characterName : this.name;
  // check the showname variable
  showName = showName || false;
  // check if the health is above 100
  healthPercentage = (healthPercentage > 100) ? 100 : healthPercentage;
  // check if the mana is above 100
  manaPercentage = (manaPercentage > 100) ? 100 : manaPercentage;
  // check if the stamina is above 100
  staminaPercentage = (staminaPercentage > 100) ? 100 : staminaPercentage;
  // empty the statistics list
  this.statistics.empty();
  // see whether the name must be shown
  if (showName === true) {
    // append the name to the element
    this.statistics.append('<p>' + name + '</p>');
  }
  // add the empty div to the health bar
  barHealth.append(emptyDiv.css({'width' : healthPercentage + '%'}).clone());
  // add the paragraph to the health bar
  barHealth.append(emptyParagraph.html(this.healthCurrent).clone());
  // add the empty div to the mana bar
  barMana.append(emptyDiv.css({'width' : manaPercentage + '%'}).clone());
  // add the paragraph to the mana bar
  barMana.append(emptyParagraph.html(this.manaCurrent).clone());
  // add the empty div to the stamina bar
  barStamina.append(emptyDiv.css({'width' : staminaPercentage + '%'}).clone());
  // add the paragraph to the stamina bar
  barStamina.append(emptyParagraph.html(this.staminaCurrent).clone());
  // add the health bar element
  this.statistics.append(barHealth);
  // add the mana bar element
  this.statistics.append(barMana);
  // add the stamina bar element
  this.statistics.append(barStamina);
  // add the right class to the statistics list
  this.statistics.addClass(this.type + 'Bars');
};

// initializes the class's abilities
BaseClass.prototype.initializeAbilities = function () {
  // a reference to this class
  var self = this;
  // empty out the abilities
  this.abilities = [];
  // go through each ability that this class has
  $.each(this.abilityList, function (index, value) {
    // instantiate the ability and add it to the list
    self.abilities.push(new value(self.game, self));
  });
};

// builds the list of abilities
BaseClass.prototype.buildAbilities = function () {
  // the class type name
  var classTypeName = $('<p class="classTypeName"></p>'),
  // the base damage
  damageBase = $('<span></span>'),
  // the name to show
  name = (this.characterName !== undefined) ? this.characterName : this.name,
  // a reference to this class
  self = this;
  // add the name
  classTypeName.html(name);
  // add the base damage
  damageBase.html('Base damage: ' + this.damageCurrent);
  // append the damage to the name
  classTypeName.append(damageBase);
  // append the name to the list
  this.abilityListElement.empty().append(classTypeName);
  // see if there are any listed abilities
  if (this.abilities) {
    // go through each ability assigned to this class type
    $.each(this.abilities, function (index, value) {
      // add the description element to the ability list
      value.initialize();
      value.addElement(self.abilityListElement);
    });
  }
  // add the right class to the ability list
  this.abilityListElement.addClass(this.type + 'AbilityList');
};

// Gain a certain type of resource
// @param String recource The recource to gain (health | mana | stamina)
// @param Integer amount The amount to gain
BaseClass.prototype.gainResource = function (resource, amount) {
  // check if the resource amount is more than 0
  if (amount > 0) {
    // increase the resource
    this[resource + 'Current'] += Math.round(amount, 0);
  }
};

// Lose a certain type of resource
// @param String recource The recource to lose (health | mana | stamina)
// @param Integer amount The amount to lose
BaseClass.prototype.loseResource = function (resource, amount) {
  // the amount that will be left over
  var remainingAmount = Math.round(this[resource + 'Current'] - amount, 0);
  // set the amount equal to 0 if it goes less
  remainingAmount = (remainingAmount < 0) ? 0 : remainingAmount;
  // check if the resource amount is more than 0
  if (amount > 0) {
    // increase the resource
    this[resource + 'Current'] = remainingAmount;
  }
};

// sets a resource to a given amount
// @param String recource The recource to set (health | mana | stamina)
// @param Integer amount The amount to set it to
BaseClass.prototype.setResource = function (resource, amount) {
  // set the resource to the new amount
  this[resource + 'Current'] = Math.round(amount, 0);
};

// Reset resources back to their base values
BaseClass.prototype.resetResources = function () {
  // reset the health resource
  this.setResource('health', this.healthBase);
  // reset the mana resource
  this.setResource('mana', this.manaBase);
  // reset the stamina resource
  this.setResource('stamina', this.staminaBase);
};

// moves the player up
BaseClass.prototype.moveUp = function () {
  // move the player in the desired direction
  this.tryMove('up');
};

// moves the player right
BaseClass.prototype.moveRight = function () {
  // move the player in the desired direction
  this.tryMove('right');
};

// moves the player down
BaseClass.prototype.moveDown = function () {
  // move the player in the desired direction
  this.tryMove('down');
};

// moves the player left
BaseClass.prototype.moveLeft = function () {
  // move the player in the desired direction
  this.tryMove('left');
};

// tries to move the player in a direction, checks for clashes
// @param string direction The direction in which the player is trying to move
BaseClass.prototype.tryMove = function (direction) {
  // rotate the player in the direction
  this.rotate(direction);
  // test whether the player clashes
  clashResult = this.detectClash(direction);
  // see if the user is moving into anything
  if (clashResult === false) {
    // move the player in the desired direction
    this.move(direction);
  } else {
    // see if there is an clash handling method for this type
    if (clashResult.clashHandler) {
      // call the clash handler method
      clashResult.clashHandler(direction);
    }
  }
};

// moves the player in a direction
// @param string direction The direction in which the player is trying to move
BaseClass.prototype.move = function (direction) {
  // check which direction we are moving
  switch (direction) {
    case 'left':
      // set the new left value
      this.left = this.left - this.width;
      // set the new left attribute for this object
      this.position.left -= 1;
      // break out of the switch
      break;
    case 'up':
      // set the new top value
      this.top = this.top - this.height;
      // set the new top attribute for the object
      this.position.top -= 1;
      // break out of the switch
      break;
    case 'right':
      // set the new left value
      this.left = this.left + this.width;
      // set the new top attribute for the object
      this.position.left += 1;
      // break out of the switch
      break;
    case 'down':
      // set the new top value
      this.top = this.top + this.height;
      // set the new top attribute for the object
      this.position.top += 1;
      // break out of the switch
      break;
  }
  // update the element with the new CSS
  this.initialize();
};

// detects a clash between the player and the map
// @param string direction The direction in which the player is trying to move
// @return boolean Whether the player clashes or not (true = clash)
BaseClass.prototype.detectMapClash = function (direction) {
  // whether the player is clashing into the bounds of the map
  var clash = false;
  // see which direction the player is going
  switch (direction) {
    case 'left':
      //see if the player clashes
      if (this.left - this.width < 0) {
        // the player clashes
        clash = true;
      }
      break;
    case 'up':
      //see if the player clashes
      if (this.top - this.height < 0) {
        // the player clashes
        clash = true;
      }
      break;
    case 'right':
      //see if the player clashes
      if (this.right + this.width > this.game.map.width) {
        // the player clashes
        clash = true;
      }
      break;
    case 'down':
      //see if the player clashes
      if (this.bottom + this.height > this.game.map.height) {
        // the player clashes
        clash = true;
      }
      break;
  }
  // return the result
  return clash === false ? clash : this.game.map;
};



// detects a clash between the player and any object
// @param string direction The direction in which the player is trying to move
// @return boolean Whether the player clashes or not (true = clash)
BaseClass.prototype.detectClash = function (direction) {
  // a list of object types to go through
  var objectTypes = ['objects'],
  // whether a clash has happened
  clash = this.detectMapClash(direction),
  // a reference to this class
  self = this;
  // see if the player hasn''t gone out of bounds
  if (clash === false) {
    // go through each of this type''s items
    $.each(this.game.map.objects, function () {
      // see if you can clash into this object
      if (this.clashable === true) {
        // see which direction we are moving in
        switch (direction) {
          case 'left':
            // see if this item is to the direct left of the player
            if (self.left - self.width >= this.left &&
                self.left - self.width < this.right &&
                self.bottom > this.top && self.top < this.bottom) {
              // clash detected
              clash = this;
            }
            break;
          case 'up':
            // see if this item is to the direct left of the player
            if (self.top - self.height >= this.top &&
                self.top - self.height < this.bottom &&
                self.right > this.left && self.left < this.right) {
              // clash detected
              clash = this;
            }
            break;
          case 'right':
            // see if this item is to the direct left of the player
            if (self.right + self.width > this.left &&
                self.left + self.width < this.right &&
                self.bottom > this.top && self.top < this.bottom) {
              // clash detected
              clash = this;
            }
            break;
          case 'down':
            // see if this item is to the direct left of the player
            if (self.bottom + self.height > this.top &&
                self.top + self.height < this.bottom &&
                self.right > this.left && self.left < this.right) {
              // clash detected
              clash = this;
            }
            break;
        }
      }
    });
  }
  // return the result
  return clash;
};

// rotate the player in a certain direction
// @param String direction The direction the player needs to turn in
BaseClass.prototype.rotate = function (direction) {
  // an object containing the image numbers corresponding to the direction
  var directions = {
    up : 0,
    right : 1,
    down : 2,
    left : 3
  };
  // see if we found a number
  if (directions[direction] % 1 === 0) {
    // set the image to the corresponding number
    this.currentImage = directions[direction];
    // update the element
    this.initialize();
  }
};

// choose a random ability for the opponent to cast
BaseClass.prototype.chooseAbilityToCast = function () {
  // a list of abilities that the opponent can cast
  var castableAbilities = [],
  // the ability that was selected
  selectedAbility = false;
  // see if the opponent has any abilities
  if (this.abilities.length > 0) {
    // go through each of the opponent abilities
    $.each(this.abilities, function () {
      // see if the opponent can cast this ability
      if (this.allowedToCast() === true) {
        // add this to the list of abilities that the opponent is able to cast
        castableAbilities.push(this);
      }
    });
  }
  // see if any castable abilities were found
  if (castableAbilities.length > 0) {
    // choose a random castable ability
    selectedAbility = castableAbilities[Math.floor((Math.random() * castableAbilities.length-1) + 1)];
  }
  // return the selected ability
  return selectedAbility;
};

// the clash handler function
// @param String direction The direction the player needs to turn in
BaseClass.prototype.clashHandler = function (direction) {
  // start a fight
  this.game.startFight(this);
};