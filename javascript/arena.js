// defines an arena
// @param object map The map object
// @param object enemy The enemy being fought
function Arena (map, enemy) {
  
  // holds this object for itself
  var self;
  
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
    // prepare the enemy for battle
    enemy.prepareForBattle();
    // prepare the player for battle
    map.player.prepareForBattle();
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
  };

  // set-up all the events for the arena
  this.setupEvents = function () {
    // bind the keyup event
    // @param events e The keyup event that triggered the function
    $(document).on('keyup', function (e) {
      switch (event.keyCode) {
        case 65:
          // A
          // cast an auto-attack
          self.cast('autoAttack');
          break;
        case 81:
          // Q
          // cast the first mana ability
          self.cast('manaOne');
          break;
        case 87:
          // W
          // cast the second mana ability
          self.cast('manaTwo');
          break;
        case 69:
          // E
          // cast the first stamina ability
          self.cast('staminaOne');
          break;
        case 82:
          // R
          // cast the second stamina ability
          self.cast('staminaTwo');
          break;
      };
    });
  };
  
  // removes all events from this page
  this.removeEvents = function () {
    // remove all document events
    $(document).off();
  };

  // add the class type ability list
  this.addClassTypeAbilityList = function () {
    // build the ability list
    map.player.classType.buildAbilityList();
    // add the ability list to the page
    $('body').append(map.player.classType.abilityList);
  };

  this.addEnemyAbilityList = function () {
    // the body element
    var body = $('body');
    // add the ability list to the body
    body.append(enemy.abilityList);
  };

  // add the player class type stats
  this.addClassTypeStatistics = function () {
    // build the class type statistics list
    map.player.classType.buildStatistics(true);
    // build the statistics for this class type
    self.element.append(map.player.classType.statisticsList);
  };

  // add the enemy statistics
  this.addEnemyStatistics = function () {
    // build the enemy statistics list
    enemy.buildStatistics(true);
    // append the enemy statistics list to the arena
    self.element.append(enemy.statisticsList);
  };

  // cast an ability
  // @param String ability The name of the ability to cast
  this.cast = function (ability) {
    // whether to cast the ability
    var castAbility = false,
    // the ability with the first letter uppercase
    uppercaseAbility = ability.charAt(0).toUpperCase() + ability.slice(1);;
    // check which type of ability this is
    switch (ability) {
      // auto-attacks
      case 'autoAttack':
        // this costs nothing and can always run
        castAbility = true
        break;
      case 'manaOne':
      case 'manaTwo':
        // this ability costs mana, compare cost to current mana
        if (map.player.classType[ability + 'Cost'] > map.player.classType.baseMana) {
          // this costs too much, show an error
          
        } else {
          // this ability can be casted
          castAbility = true;
        }
        break;
      case 'staminaOne':
      case 'staminaTwo':
        // this ability costs stamina, compare cost to current stamina
        if (map.player.classType[ability + 'Cost'] > map.player.classType.baseStamina) {
          // this costs too much, show an error
          
        } else {
          // this ability can be casted
          castAbility = true;
        }
        break;
    };
    // may this ability be casted
    if (castAbility === true) {
      // turn off document events
      self.removeEvents();



      // build the element that shows the current ability being cast
      map.player.classType.buildAbilityCastElement(ability);
      // append the new ability cast element to the page
      self.element.append(map.player.classType.abilityCastElement);

      // build the auto-attack box
//      map.player.classType['build' + uppercaseAbility + 'Cast']();
      // add the auto-attack cast box to the arena
//      self.element.append(map.player.classType.abilityBox);
      // perform the auto-attack
      map.player.classType['perform' + uppercaseAbility](enemy);
      // remove the auto-attack box from the arena
      map.player.classType.removeAbilityCastBox(self.setupEvents);
    }
    // check if the fight is over
    self.checkForFightEnd();
  };
  
  // check for a win or loss
  this.checkForFightEnd = function () {
    // check if either enemy or your health 0 or smaller
    if (enemy.baseHealth <= 0 || map.player.classType.baseHealth <= 0) {
      // detach the player from the arena
      map.player.playerElement.detach();
      // remove the arena
      self.element.remove();
      // remove the class type ability list
      map.player.classType.abilityList.remove();
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
  
  // set the self variable equal to this class
  self = this;

}