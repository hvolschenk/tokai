// a base class type object for common methods between all class types (warrior, mage, rogue)
function BaseClass () {
  
  // a reference to this class
  var self;
  
  // a list of letters that are bound to abilities
  this.abilityLetters = {
    autoAttack : 'A',
    manaOne    : 'Q',
    manaTwo    : 'W',
    staminaOne : 'E',
    staminaTwo : 'R'
  };
  // the name of an auto-attack
  this.autoAttackName = 'Auto Attack';
  // the list that holds the enemy abilities
  this.abilityList = $('<div class="abilityList classTypeAbilityList"></div>');
  // the statistics list
  this.statisticsList = $('<div class="bars classTypeBars active"></div>');
  // the bubble that shows the ability currently being cast
  this.abilityCastElement = $('<div class="abilityCast abilityCastClassType"></div>');
  
  // a function to show the statistics of a class type
  // @param Boolean showName Whether to add in the character name
  this.buildStatistics = function (showName) {
    // the health bar element
    var barHealth = $('<div class="bar health"></div>'),
    // the mana bar element
    barMana = $('<div class="bar mana"></div>'),
    // the stamina bar element
    barStamina = $('<div class="bar stamina"></div>');
    // empty the statistics list
    self.statisticsList.empty();
    // see whether the name must be shown
    if (showName === true) {
      // append the name to the element
      self.statisticsList.append('<p>' + self.characterName + '</p>');
    }
    // add the health bar element
    self.statisticsList.append(barHealth);
    // add the mana bar element
    self.statisticsList.append(barMana);
    // add the stamina bar element
    self.statisticsList.append(barStamina);
    // set the width and title of the health bar
    barHealth.css({'width' : self.baseHealth + 'px'}).html('<p>' + self.baseHealth + '</p>');
    // set the width and title of the mana bar
    barMana.css({'width' : self.baseMana + 'px'}).html('<p>' + self.baseMana + '</p>');
    // set the width and title of the health bar
    barStamina.css({'width' : self.baseStamina + 'px'}).html('<p>' + self.baseStamina + '</p>');
  };

  // add the ability list
  this.buildAbilityList = function () {
    
    //test
    var test = '<div class="keyboardKey">' + self.abilityLetters['autoAttack'] + '</div><p>Auto-Attack (10):<br /><span>' + self.autoAutoAttackDescription + '</span></p>';
    var abilityDescription = $('<div class="abilityDescription"></div>'),
    keyboardKey = $('<div class="keyboardKey"></div>'),
    description = $('<p></p>'),
    costIndicator = $('<div class="costIndicator mana"></div>');
    costIndicator.html('90');
    keyboardKey.html(self.abilityLetters['autoAttack']);
    description.html('Auto-Attack (10):<br /><span>' + self.autoAttackDescription + '</span>');
    abilityDescription.append(keyboardKey, description, costIndicator);



    // a list of basic attacks
    var basicAttacks = $('<ul class="basicAttacks"></ul>'),
    // a list of magic abilities
    magicAbilities = $('<ul class="magicAbilities"></ul>'),
    // a list of stamina abilities
    staminaAbilities = $('<ul class="staminaAbilities"></ul>');
    // add the auto attacks list items
    self.addAutoAttackList(basicAttacks);
    // add the magic abilities list items
    self.addMagicAbilitiesList(magicAbilities);
    // add the stamina abilities list items
    self.addStaminaAbilitiesList(staminaAbilities);
    // add the three lists to the ability list element
    self.abilityList.append(abilityDescription, '<p class="name">' + self.name + '</p>', '<p>Basic Attacks</p>', basicAttacks, '<p>Magic abilities</p>', magicAbilities, '<p>Stamina Abilities</p>', staminaAbilities);
  };
  
  // add the basic attacks list
  // @param htmlObject list The unordered list to add the elements into
  this.addAutoAttackList = function (list) {
    // build the list item for auto-attacks
    var autoAttackListItem = $('<li>A - Auto-attack (' + self.baseAttackDamage + '):<br /><span>' + self.autoAttackDescription + '</span></li>');
    // add this list item to the list
    list.append(autoAttackListItem);
  };
  
  // add the magic abilities list items
  // @param htmlObject list The unordered list to add the elements into
  this.addMagicAbilitiesList = function (list) {
    // the list item for the first magic ability
    var magicAbilityOneListItem = $('<li>Q - ' + self.manaOneName + ' (' + self.manaOneCost + ' Mana)<br /><span>' + self.manaOneDescription + '</span></li>'),
    // the list item for the second magic ability
    magicAbilityTwoListItem = $('<li>W - ' + self.manaTwoName + ' (' + self.manaTwoCost + ' Mana)<br /><span>' + self.manaTwoDescription + '</span></li>');
    // add the first magic ability to the list
    list.append(magicAbilityOneListItem);
    // add the second magic ability to the list
    list.append(magicAbilityTwoListItem);
  };

  // add the stamina abilities list items
  // @param htmlObject list The unordered list to add the elements into
  this.addStaminaAbilitiesList = function (list) {
    // the list item for the first stamina ability
    var staminaAbilityOneListItem = $('<li>E - ' + self.staminaOneName + ' (' + self.staminaOneCost + ' Stamina)<br /><span>' + self.staminaOneDescription + '</span></li>'),
    // the list item for the second stamina ability
    staminaAbilityTwoListItem = $('<li>R - ' + self.staminaTwoName + ' (' + self.staminaTwoCost + ' Stamina)<br /><span>' + self.staminaTwoDescription + '</span></li>');
    // add the first stamina ability to the list
    list.append(staminaAbilityOneListItem);
    // add the second stamina ability to the list
    list.append(staminaAbilityTwoListItem);
  };

  // build the element that will show the ability being cast
  // @param String ability The ability being cast
  this.buildAbilityCastElement = function (ability) {
    // the class to give to the unordered list
    var listClass,
    // the description of the current ability
    abilityDescription,
    // the unordered list
    list = $('<ul></ul>'),
    // the list item
    listItem = $('<li></li>');
    // make a descision based on the ability being cast
    switch (ability) {
      // the auto attack ability
      case 'autoAttack':
        // the list class for auto attacks
        listClass = 'basicAttacks';
        break;
      // the mana abilities
      case 'manaOne':
      case 'manaTwo':
        // the list class for mana abilities
        listClass = 'magicAbilities';
        break;
      // the stamina abilities
      case 'staminaOne':
      case 'staminaTwo':
        // the list class for stamina abilities
        listClass = 'staminaAbilities';
        break
    }
    // add the class to the list
    list.addClass(listClass);
    // add the description to the list item
    listItem.html(self.abilityLetters[ability] + ' - ' + self[ability + 'Name'] + ':<br /><span>' + self[ability + 'Description'] + '</span>');
    // add the list item to the list
    list.append(listItem);
    // set the new inner html of the ability cast element
    self.abilityCastElement.empty().append(list);
  };

  // when you use mana
  // @param Integer manaAmount The amount of mana being used
  this.useMana = function (manaAmount) {
    // the mana bar
    var manaBar = self.statisticsList.find('.mana');
    // update the class base mana
    self.baseMana -= manaAmount;
    // update the class type mana bar
    manaBar.css({
      width : self.baseMana + 'px'
    }).html('<p>' + self.baseMana + '</p>');
  };
  
  // when you use stamina
  // @param Integer staminaAmount The amount of stamina being used
  this.useStamina = function (staminaAmount) {
    // the mana bar
    var staminaBar = self.statisticsList.find('.stamina');
    // update the class base mana
    self.baseStamina -= staminaAmount;
    // update the class type mana bar
    staminaBar.css({
      width : self.baseStamina + 'px'
    }).html('<p>' + self.baseStamina + '</p>');
  };
  
  // when you receive stamina
  // @param Integer staminaAmount The amount of stamina to gain
  this.gainStamina = function (staminaAmount) {
    // the stamina bar
    var staminaBar = self.statisticsList.find('.stamina');
    // update the class type base stamina
    self.baseStamina += staminaAmount;
    // update the class type stamina bar
    staminaBar.css({
      width : self.baseStamina + 'px'
    }).html('<p>' + self.baseStamina + '</p>');
  };

  // when you receive health
  // @param Integer healthAmount The amount of stamina to gain
  this.gainHealth = function (healthAmount) {
    // the stamina bar
    var healthBar = self.statisticsList.find('.health');
    // update the class type base stamina
    self.baseHealth += healthAmount;
    // update the class type stamina bar
    healthBar.css({
      width : self.baseHealth + 'px'
    }).html('<p>' + self.baseHealth + '</p>');
  };

  // removes the ability cast box
  // @param Function callback A callback function to run once the box is removed
  this.removeAbilityCastBox = function (callback) {
    // set a timeout
    window.setTimeout(function () {
      // remove the auto-attack box from the arena
      self.abilityCastElement.detach();
      // empty the box
      self.abilityCastElement.empty();
      // check if callback is defined and a function
      if (typeof(callback) === 'function') {
        // call the callback
        callback();
      }
    }, 2000);
  };
  
  // set the reference to this class
  self = this;

}