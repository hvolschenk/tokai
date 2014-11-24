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
    self.addAbilitiesList();
    // add the player statistics to the arena
    self.addClassTypeStatistics();
  };

  // set-up all the events for the arena
  this.setupEvents = function () {
    // bind the keyup event
    // @param events e The keyup event that triggered the function
    $(document).on('keyup', function (e) {
      switch (event.keyCode) {
        case 65:
          // a
          break;
        case 81:
          // q
          break;
        case 87:
          // w
          break;
        case 69:
          // e
          break;
        case 82:
          // r
          break;
      };
    });
  };
  
  // add the abilities list
  this.addAbilitiesList = function () {
    // the body element
    var body = $('body'),
    // a list of basic attacks
    basicAttacks = $('<ul class="basicAttacks"></ul>'),
    // a list of magic abilities
    magicAbilities = $('<ul class="magicAbilities"></ul>'),
    // a list of stamina abilities
    staminaAbilities = $('<ul class="staminaAbilities"></ul>');
    // add the ability list to the page
    body.append(self.abilityList);
    // add the three lists to the ability list element
    self.abilityList.append('<p>Basic Attacks</p>');
    self.abilityList.append(basicAttacks);
    self.abilityList.append('<p>Magic abilities</p>');
    self.abilityList.append(magicAbilities);
    self.abilityList.append('<p>Stamina Abilities</p>');
    self.abilityList.append(staminaAbilities);
    // add the auto attacks list items
    self.addBasicAttackList(basicAttacks);
    // add the magic abilities list items
    self.addMagicAbilitiesList(magicAbilities);
    // add the stamina abilities list items
    self.addStaminaAbilitiesList(staminaAbilities);
  };
  
  // add the basic attacks list
  // @param htmlObject list The unordered list to add the elements into
  this.addBasicAttackList = function (list) {
    // build the list item for auto-attacks
    var autoAttackListItem = $('<li>A - Auto-attack:<br /><span>' + map.player.classType.autoAttackDescription + '</span></li>');
    // add this list item to the list
    list.append(autoAttackListItem);
  };
  
  // add the magic abilities list items
  // @param htmlObject list The unordered list to add the elements into
  this.addMagicAbilitiesList = function (list) {
    // the list item for the first magic ability
    var magicAbilityOneListItem = $('<li>Q - ' + map.player.classType.manaOneName + ' (' + map.player.classType.manaOneCost + ' Mana)<br /><span>' + map.player.classType.manaOneDescription + '</span></li>'),
    // the list item for the first magic ability
    magicAbilityTwoListItem = $('<li>W - ' + map.player.classType.manaTwoName + ' (' + map.player.classType.manaTwoCost + ' Mana)<br /><span>' + map.player.classType.manaTwoDescription + '</span></li>');
    // add the first magic ability to the list
    list.append(magicAbilityOneListItem);
    // add the second magic ability to the list
    list.append(magicAbilityTwoListItem);
  };

  // add the stamina abilities list items
  // @param htmlObject list The unordered list to add the elements into
  this.addStaminaAbilitiesList = function (list) {
    // the list item for the first stamina ability
    var staminaAbilityOneListItem = $('<li>E - ' + map.player.classType.staminaOneName + ' (' + map.player.classType.staminaOneCost + ' Stamina)<br /><span>' + map.player.classType.staminaOneDescription + '</span></li>'),
    // the list item for the first stamina ability
    staminaAbilityTwoListItem = $('<li>R - ' + map.player.classType.staminaTwoName + ' (' + map.player.classType.staminaTwoCost + ' Stamina)<br /><span>' + map.player.classType.staminaTwoDescription + '</span></li>');
    // add the first stamina ability to the list
    list.append(staminaAbilityOneListItem);
    // add the second stamina ability to the list
    list.append(staminaAbilityTwoListItem);
  };
  
  
  
  
  
  
  
  
  
  // add the player class type stats
  this.addClassTypeStatistics = function () {
    // the element that will contain the three bars
    var barsElement = $('<div class="bars"><p>' + map.player.classType.characterName + '</p></div>'),
    // the health bar element
    barHealth = $('<div class="bar health"></div>'),
    // the mana bar element
    barMana = $('<div class="bar mana"></div>'),
    // the stamina bar element
    barStamina = $('<div class="bar stamina"></div>');
    // add the bars container to the statitics element
    self.element.append(barsElement);
    // add the health bar element
    barsElement.append(barHealth);
    // add the mana bar element
    barsElement.append(barMana);
    // add the stamina bar element
    barsElement.append(barStamina);
    // set the width and title of the health bar
    barHealth.css({'width' : map.player.classType.baseHealth + 'px'}).html('<p>' + map.player.classType.baseHealth + '</p>');
    // set the width and title of the mana bar
    barMana.css({'width' : map.player.classType.baseMana + 'px'}).html('<p>' + map.player.classType.baseMana + '</p>');
    // set the width and title of the health bar
    barStamina.css({'width' : map.player.classType.baseStamina + 'px'}).html('<p>' + map.player.classType.baseStamina + '</p>');
  };
  
  
  
  
  
  

  // set the self variable equal to this class
  self = this;

}