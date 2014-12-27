// defines any fighter friendly or enemy
// @param object map The map object
function Fighter (map) {

  // a reference to this class
  var self = this;

  // extend this object with the base object
  BaseObject.call(this, map);

  // give this object a type
  this.type = 'fighter';
  // The fighter's level
  this.level = (function () {
    // the map we are on
    var mapNumber = map ? map.map : 1;
    // the level is the same as the map
    return mapNumber;
  })();
  // the list that holds the enemy abilities
  this.abilityList = $('<div class="abilityList"></div>');
  // the list that holds the enemy statistics
  this.statisticsList = $('<div class="bars"></div>');

  // sets up the statistics of this fighter
  (function () {
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
  })();

  // an initialize method for all fighters
  // @param object object The object to load
  this.initialize = function (object) {
    // set up the statistics for this type
    //self.setupStatistics();
    // see if an object exists
    if (object) {
      // set the object position
      self.position = object.position;
      // set the left offset value
      self.left = self.position.left * self.width;
      // set the top offset value
      self.top = self.position.top * self.height;
      // set the right offset value
      self.right = self.left + self.width;
      // set the bottom offset value
      self.bottom = self.top + self.height;
      // check if an image was set
      if (object.image || object.image === 0) {
        // set this as the default image
        self.currentImage = object.image;
      }
    }
  };

  // a function to show the statistics of a class type
  // @param Boolean showName Whether to add in the character name
  this.buildStatistics = function (showName) {
    // the health bar element
    var barHealth = $('<div class="bar health"></div>'),
    // the mana bar element
    barMana = $('<div class="bar mana"></div>'),
    // the stamina bar element
    barStamina = $('<div class="bar stamina"></div>'),
    // an empty div to append th each bar
    emptyDiv = $('<div></div>'),
    // an empty paragraph tag
    emptyParagraph = $('<p></p>'),
    // the percentage of the health bar
    healthPercentage = (self.healthCurrent / self.healthTotal) * 100,
    // the percentage of the mana bar
    manaPercentage = (self.manaCurrent / self.manaTotal) * 100,
    // the percentage of the stamina bar
    staminaPercentage = (self.staminaCurrent / self.staminaTotal) * 100,
    // the name to show
    name = (self.characterName !== undefined) ? self.characterName : self.name;

    // check if the health is above 100
    healthPercentage = (healthPercentage > 100) ? 100 : healthPercentage;
    // check if the mana is above 100
    manaPercentage = (manaPercentage > 100) ? 100 : manaPercentage;
    // check if the stamina is above 100
    staminaPercentage = (staminaPercentage > 100) ? 100 : staminaPercentage;
    // empty the statistics list
    self.statisticsList.empty();
    // see whether the name must be shown
    if (showName === true) {
      // append the name to the element
      self.statisticsList.append('<p>' + name + '</p>');
    }
    // add the empty div to the health bar
    barHealth.append(emptyDiv.css({'width' : healthPercentage + '%'}).clone());
    // add the paragraph to the health bar
    barHealth.append(emptyParagraph.html(self.healthCurrent).clone());
    // add the empty div to the mana bar
    barMana.append(emptyDiv.css({'width' : manaPercentage + '%'}).clone());
    // add the paragraph to the mana bar
    barMana.append(emptyParagraph.html(self.manaCurrent).clone());
    // add the empty div to the stamina bar
    barStamina.append(emptyDiv.css({'width' : staminaPercentage + '%'}).clone());
    // add the paragraph to the stamina bar
    barStamina.append(emptyParagraph.html(self.staminaCurrent).clone());
    // add the health bar element
    self.statisticsList.append(barHealth);
    // add the mana bar element
    self.statisticsList.append(barMana);
    // add the stamina bar element
    self.statisticsList.append(barStamina);
    // add the right class to the statistics list
    self.statisticsList.addClass(self.type + 'Bars');
  };
  
  // builds the list of abilities
  this.buildAbilityList = function () {
    // the class type name
    var classTypeName = $('<p class="classTypeName"></p>'),
    // the base damage
    damageBase = $('<span></span>'),
    // the name to show
    name = (self.characterName !== undefined) ? self.characterName : self.name;
    // add the name
    classTypeName.html(name);
    // add the base damage
    damageBase.html('Base damage: ' + self.damageCurrent);
    // append the damage to the name
    classTypeName.append(damageBase);
    // append the name to the list
    self.abilityList.empty().append(classTypeName);
    // see if there are any listed abilities
    if (self.abilities) {
      // go through each ability assigned to this class type
      $.each(self.abilities, function () {
        // build the ability description element
        this.updateAbilityDescriptionElement();
        // add the description element to the ability list
        self.abilityList.append(this.abilityDescriptionElement);
      });
    }
    // add the right class to the ability list
    self.abilityList.addClass(self.type + 'AbilityList');
  };

  // Gain a certain type of resource
  // @param String recource The recource to gain (health | mana | stamina)
  // @param Integer amount The amount to gain
  this.gainResource = function (resource, amount) {
    // check if the resource amount is more than 0
    if (amount > 0) {
      // increase the resource
      self[resource + 'Current'] += amount;
    }
  };

  // Lose a certain type of resource
  // @param String recource The recource to lose (health | mana | stamina)
  // @param Integer amount The amount to lose
  this.loseResource = function (resource, amount) {
    // the amount that will be left over
    var remainingAmount = self[resource + 'Current'] - amount;
    // set the amount equal to 0 if it goes less
    remainingAmount = (remainingAmount < 0) ? 0 : remainingAmount;
    // check if the resource amount is more than 0
    if (amount > 0) {
      // increase the resource
      self[resource + 'Current'] = remainingAmount;
    }
  };
  
  // sets a resource to a given amount
  // @param String recource The recource to set (health | mana | stamina)
  // @param Integer amount The amount to set it to
  this.setResource = function (resource, amount) {
    // set the resource to the new amount
    self[resource + 'Current'] = amount;
  };
  
  // Reset resources back to their base values
  this.resetResources = function () {
    // reset the health resource
    self.setResource('health', self.healthBase);
    // reset the mana resource
    self.setResource('mana', self.manaBase);
    // reset the stamina resource
    self.setResource('stamina', self.staminaBase);
  };

}