// defines an enemy
// @param object map The map object
function BaseEnemy (map) {
  
  // holds this object for itself
  var self;
  
  // extend this object with the base object
  BaseObject.call(this, map);
  // give this object a type
  this.type = 'enemy';
  // the list that holds the enemy abilities
  this.abilityList = $('<div class="abilityList enemyAbilityList"></div>');
  
  // adds a clash handler method
  // @param string direction The direction the player is moving in
  this.clashHandler = function (direction) {
    // start a fight
    map.loadArena(self);
  }
  
  // prepares the enemy for battle
  this.prepareForBattle = function () {
    // HENDRIK - set the correct bg image once we have one
    // built the abilities list component
    self.buildAbilitiesList();
  }

  // a function to show the statistics of an enemy
  // @param Boolean showName Whether to add in the enemy name
  // @return jQuery htmlObject The statistics bar
  this.buildStatistics = function (showName) {
    // the element that will contain the three bars
    var barsElement = $('<div class="bars enemyBars"></div>'),
    // the health bar element
    barHealth = $('<div class="bar health"></div>'),
    // the mana bar element
    barMana = $('<div class="bar mana"></div>'),
    // the stamina bar element
    barStamina = $('<div class="bar stamina"></div>');
    // see whether the name must be shown
    if (showName === true) {
      // append the name to the element
      barsElement.append('<p>' + self.name + '</p>');
    }
    // add the health bar element
    barsElement.append(barHealth);
    // add the mana bar element
    barsElement.append(barMana);
    // add the stamina bar element
    barsElement.append(barStamina);
    // set the width and title of the health bar
    barHealth.css({'width' : self.baseHealth + 'px'}).html('<p>' + self.baseHealth + '</p>');
    // set the width and title of the mana bar
    barMana.css({'width' : self.baseMana + 'px'}).html('<p>' + self.baseMana + '</p>');
    // set the width and title of the health bar
    barStamina.css({'width' : self.baseStamina + 'px'}).html('<p>' + self.baseStamina + '</p>');
    // return the element that was built up
    return barsElement;
  };

  // add the abilities list
  this.buildAbilitiesList = function () {
    // a list of basic attacks
    var basicAttacks = $('<ul class="basicAttacks"></ul>'),
    // a list of magic abilities
    magicAbilities = $('<ul class="magicAbilities"></ul>'),
    // a list of stamina abilities
    staminaAbilities = $('<ul class="staminaAbilities"></ul>');
    // add the auto attacks list items
    self.addBasicAttackList(basicAttacks);
    // add the magic abilities list items
    self.addMagicAbilitiesList(magicAbilities);
    // add the stamina abilities list items
    self.addStaminaAbilitiesList(staminaAbilities);
    // add the three lists to the ability list element
    self.abilityList.append('<p class="name">' + self.name + '</p>', '<p>Basic Attacks</p>', basicAttacks, '<p>Magic abilities</p>', magicAbilities, '<p>Stamina Abilities</p>', staminaAbilities);
  };
  
  // add the basic attacks list
  // @param htmlObject list The unordered list to add the elements into
  this.addBasicAttackList = function (list) {
    // build the list item for auto-attacks
    var autoAttackListItem = $('<li>A - Auto-attack:<br /><span>' + self.autoAttackDescription + '</span></li>');
    // add this list item to the list
    list.append(autoAttackListItem);
  };
  
  // add the magic abilities list items
  // @param htmlObject list The unordered list to add the elements into
  this.addMagicAbilitiesList = function (list) {
    // the list item for the first magic ability
    var magicAbilityOneListItem = $('<li>Q - ' + self.manaOneName + ' (' + self.manaOneCost + ' Mana)<br /><span>' + self.manaOneDescription + '</span></li>');
    // add the first magic ability to the list
    list.append(magicAbilityOneListItem);
  };

  // add the stamina abilities list items
  // @param htmlObject list The unordered list to add the elements into
  this.addStaminaAbilitiesList = function (list) {
    // the list item for the first stamina ability
    var staminaAbilityOneListItem = $('<li>E - ' + self.staminaOneName + ' (' + self.staminaOneCost + ' Stamina)<br /><span>' + self.staminaOneDescription + '</span></li>');
    // add the first stamina ability to the list
    list.append(staminaAbilityOneListItem);
  };

  // set the self variable equal to this class
  self = this;

}