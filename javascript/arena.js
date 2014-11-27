// defines an arena
// @param object map The map object
// @param object enemy The enemy being fought
function Arena (map, enemy) {
  
  // holds this object for itself
  var self = this;
  
  // extend this object with the base object
  BaseObject.call(this, map);
  // give this object a type
  this.type = 'arena';
  // the width of the arena
  this.width = 600;
  // the height of the arena
  this.height = 600;
  // the abilities list element
  this.abilityList = $('<div class="abilityList"></div>');
  
  // initializes the element object and loads the local variables
  // @param object object The object to load
  this.initialize = function () {
    // add the enemy element to the arena
    enemy.addElement(self.element);
    // add the player to the arena
    map.player.addElement(self.element);
    // add the ability list to the page
    self.addClassTypeAbilityList();
    // add the enemy ability list to the page
    self.addEnemyAbilityList();
    // add the player statistics to the arena
    self.addClassTypeStatistics();
    // add the enemy statistics to the arena
    self.addEnemyStatistics();
    // add the events to the page
    self.setupEvents();
    // start the player turn
    self.startFriendlyTurn();
  };
  
  // start the player turn
  this.startFriendlyTurn = function () {
    // highlight the friendly statistics element
    map.player.statisticsList.addClass('active');
    // un-highlight the enemy statistics element
    enemy.statisticsList.removeClass('active');
  };
  
  // start the enemy turn
  this.startEnemyTurn = function () {
    // un-highlight the enemy statistics element
    enemy.statisticsList.addClass('active');
    // highlight the friendly statistics element
    map.player.statisticsList.removeClass('active');
  };

  // set-up all the events for the arena
  this.setupEvents = function () {
    // bind the keyup event
    // @param events e The keyup event that triggered the function
    $(document).on('keyup', function (e) {
      // the key that was pressed
      var key = String.fromCharCode(e.keyCode);
      // cast the ability
      self.castFriendlyAbility(key);
    });
  };
  
  // cast a firendly ability
  // @param string key The key that was pressed
  this.castFriendlyAbility = function (key) {
    // check if any abilities are linked to the class type
    if (map.player.abilities) {
      // loop through all abilities linked to this class type
      $.each(map.player.abilities, function () {
        // a clone of the ability description
        var descriptionClone;
        // see if the current pressed key is the ability key
        if (this.key === key) {
          // see if the ability is allowed to be casted
          if (this.allowedToCast() === true) {
            // remove events from this page
            self.removeEvents();
            // clone the description
            descriptionClone = this.abilityDescriptionElement.clone();
            // add the ability description to the arena
            self.element.append(descriptionClone);
            // cast the ability
            this.cast(enemy);
            // finish the current ability
            self.finishCurrentAbility(descriptionClone, false, self.castEnemyAbility);
          }
        }
      });
    }
  };

  // show the current ability
  // @param htmlElement descriptionElementClone The secription of the ability
  // @param Boolean enableEvents Whether or not to re-enable events on the arena
  // @param Function complete A function to run when the ability is finished casting
  this.finishCurrentAbility = function (descriptionElementClone, enableEvents, complete) {
    // set a timeout for 2 second
    window.setTimeout(function () {
      // remove the element
      descriptionElementClone.remove();
      // see if events need to be set up
      if (enableEvents === true) {
        // re enable all events
        self.setupEvents();
      }
      // check if the fight is over
      self.checkForFightEnd();
      // check if the complete callback is a function
      if (typeof(complete) === 'function') {
        // call the complete callback
        complete();
      }
    }, 2000);
  };
  
  // cast an enemy ability
  this.castEnemyAbility = function () {
    // start the enemy turn
    self.startEnemyTurn();
    // find an ability for the enemy to cast
    var ability = enemy.chooseAbilityToCast(),
    // a clone of the ability description element
    descriptionClone;
    // check if an ability was found
    if (ability !== false) {
      // create a clone of the ability description
      descriptionClone = ability.abilityDescriptionElement.clone();
      // add the ability description element to the arena
      self.element.append(descriptionClone);
      // cast the ability
      ability.cast(map.player);
      // finish the current ability
      self.finishCurrentAbility(descriptionClone, true, self.startFriendlyTurn);
    }
  };
  
  // removes all events from this page
  this.removeEvents = function () {
    // remove all document events
    $(document).off();
  };

  // add the class type ability list
  this.addClassTypeAbilityList = function () {
    // build the ability list
    map.player.buildAbilityList();
    // add the ability list to the page
    $('body').append(map.player.abilityList);
  };

  this.addEnemyAbilityList = function () {
    // build the ability list
    enemy.buildAbilityList();
    // add the ability list to the page
    $('body').append(enemy.abilityList);
  };

  // add the player class type stats
  this.addClassTypeStatistics = function () {
    // build the class type statistics list
    map.player.buildStatistics(true);
    // build the statistics for this class type
    self.element.append(map.player.statisticsList);
  };

  // add the enemy statistics
  this.addEnemyStatistics = function () {
    // build the enemy statistics list
    enemy.buildStatistics(true);
    // append the enemy statistics list to the arena
    self.element.append(enemy.statisticsList);
  };
  
  // check for a win or loss
  this.checkForFightEnd = function () {
    // check if either enemy or your health 0 or smaller
    if (enemy.healthCurrent <= 0 || map.player.healthCurrent <= 0) {
      // reset the player resources
      map.player.resetResources();
      // detach the player from the arena
      map.player.element.detach();
      // remove the arena
      self.element.remove();
      // remove the class type ability list
      map.player.abilityList.remove();
      // remove the enemy ability list
      enemy.abilityList.remove();
      // remove the arena events
      self.removeEvents();
      // remove the item from the map''s array
      map.objects.splice(map.objects.indexOf(enemy), 1);
      // show the map element
      map.mapElement.show();
      // add the player to the arena
      map.player.addElement(map.mapElement);
      // show the status text area
      map.statusTextElement.show();
      // show the inventory
      map.player.inventory.inventoryElement.show();
      // add the map events
      map.setupEvents();
    }
  };

}