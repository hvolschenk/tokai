function CharacterSelect () {
  // this current class
  var self;
  
  // the character''s name
  this.characterName = '';
  // the character class
  this.characterClass = '';
  // the container element that will hold the character selection screen
  this.container = $('<div class="container"></div>');
  // the character element that will hold the selected class type image and name
  this.characterElement = $('<div class="character"></div>');
  // the character name field holder element
  this.characterNameFieldHolder = $('<div class="characterNameContainer"></div>');
  // the character selection list
  this.characterSelectList = $('<ul class="characterSelectList"></ul>');
  // the statistics element
  this.statisticsElement = $('<div class="statistics"></div>'),
  // a instance of the warrior class
  this.classWarrior = new ClassWarrior();
  // a instance of the mage class
  this.classMage = new ClassMage();
  // a instance of the rogue class
  this.classRogue = new ClassRogue();
  // the selected class type
  this.selectedClassType = 'classWarrior';
  
  // initializes the charcter selection screen
  this.initialize = function () {
    // add the container element
    self.addContainerElement();
    // add the character name field
    self.addNameField();
    // add the character element
    self.addCharacterElement();
    // add the class thumbnails to the page
    self.addClassThumbnails();
    // add the events to this page
    self.addEvents();
  };
  
  // adds the container element to the page
  this.addContainerElement = function () {
    // get the body element
    var body = $('body');
    // add the container to the body
    body.append(self.container);
  };

  // adds the character name input field
  this.addNameField = function () {
    // the character name field label
    var characterNameFieldLabel = $('<label for="characterNameField" class="characterNameFieldLabel">Character Name</label>'),
    // the character name input field
    characterNameField = $('<input type="text" id="characterNameField" name="characterName" maxlength="16" />');
    // set the name in the name field
    characterNameField.val(self.characterName);
    // add the label to the character name field holder
    self.characterNameFieldHolder.append(characterNameFieldLabel);
    // add the input field to the chatacter name field holder
    self.characterNameFieldHolder.append(characterNameField);
    // append the name field holder to the container
    self.container.append(self.characterNameFieldHolder);
  };

  // adds the character element to the container
  this.addCharacterElement = function () {
    // append the character element to the container element
    self.container.append(self.characterElement);
    // load the default class type
    self.loadClassType();
  };

  // loads a class type
  this.loadClassType = function () {
    // set the background-image of the character element
    self.characterElement.css({'background-image' : 'url(' + self[self.selectedClassType].images.front + ')'});
    // add the class type name to the element
    self.characterElement.html('<p>' + self[self.selectedClassType].name + '</p>');
    // add the next arrow to the character element
    self.characterElement.append('<a class="next"></a>');
  };

  // loads a class description
  this.loadClassDescription = function (classType) {
    // the next arrow
    var nextArrow = self.characterElement.find('.next'),
    // the paragraph element
    paragraph = self.characterElement.find('p');
    // add the selected class to the character element
    self.characterElement.addClass('selected');
    // remove the next arrow from the page
    nextArrow.fadeOut(0, function () {nextArrow.remove();});
    // remove the class name from the page
    paragraph.fadeOut(0, function () {paragraph.remove();});
    // hide the class type selection list
    self.characterSelectList.hide();
    // add the lore section
    self.loadClassDescriptionLore();
    // add the abilities section
    self.loadClassDescriptionAbilities();
    // add the list section
    self.loadClassDescriptionList();
    // add the statistics section
    self.loadClassDescriptionStatistics();
    // add the name as a paragraph in the name area
    self.characterNameFieldHolder.empty().html('<p>' + self.characterName + '</p>');
  };

  // loads a class type description, lore section
  this.loadClassDescriptionLore = function () {
    // add the previous arrow to the character element
    self.characterElement.append('<a class="prev" id="' + self.selectedClassType + '"></a>');
    // add the class type description to the character element
    self.characterElement.append('<p class="lore"><span>' + self[self.selectedClassType].name + '</span>' + self[self.selectedClassType].lore + '</p>');
  };

  // loads a class type description, abilities section
  this.loadClassDescriptionAbilities = function () {
    // a description of the class type auto attack
    var autoAttack = 'Auto-attack (' + self[self.selectedClassType].baseAttackDamage + '):<br /><span>' + self[self.selectedClassType].autoAttackDescription + '</span><br /><br />',
    // a description of the class type mana ability one
    manaOne = self[self.selectedClassType].manaOneName + ' (' + self[self.selectedClassType].manaOneCost + ' Mana)<br /><span>' + self[self.selectedClassType].manaOneDescription + '</span><br /><br />',
    // a description of the class type mana ability two
    manaTwo = self[self.selectedClassType].manaTwoName + ' (' + self[self.selectedClassType].manaTwoCost + ' Mana)<br /><span>' + self[self.selectedClassType].manaTwoDescription + '</span><br /><br />',
    // a description of the class type stamina ability one
    staminaOne = self[self.selectedClassType].staminaOneName + ' (' + self[self.selectedClassType].staminaOneCost + ' Stamina)<br /><span>' + self[self.selectedClassType].staminaOneDescription + '</span><br /><br />',
    // a description of the class type stamina ability two
    staminaTwo = self[self.selectedClassType].staminaTwoName + ' (' + self[self.selectedClassType].staminaTwoCost + ' Stamina)<br /><span>' + self[self.selectedClassType].staminaTwoDescription + '</span><br /><br />';
    // add the class abillities to the character elemtn
    self.characterElement.append('<p class="abilities">' + autoAttack + manaOne + manaTwo + staminaOne + staminaTwo + '</p>');
  };

  // loads a class type description, list section
  this.loadClassDescriptionList = function () {
    // the unordered list to add to the character element
    var list = $('<ul></ul>'),
    // the "lore" list item to add to the list
    listItemLore = $('<li><a class="showLore">Lore</a></li>'),
    // the "abilities" list item to add to the list
    listItemAbilities = $('<li><a class="showAbilities">Abilities</a></li>');
    // add the list item to the character element
    self.characterElement.append(list);
    // add the "lore" list item to the list
    list.append(listItemLore);
    // add the "abilities" list item to the list
    list.append(listItemAbilities);
  };

  // loads a class type description, statistics section
  this.loadClassDescriptionStatistics = function () {
    // the play button
    var playButton = $('<a class="playButton">Play</a>');
    // add the play button to the statistics element
    self.statisticsElement.append(playButton);
    // add the statistics element to the page
    self.container.append(self.statisticsElement);
    // build the class type statistics list
    self[self.selectedClassType].buildStatistics(false)
    // add the bars container to the statitics element
    self.statisticsElement.append(self[self.selectedClassType].statisticsList);
  };
  
  // adds the class thumbnails to the page
  this.addClassThumbnails = function () {
    // add the class selection list to the page
    self.container.append(self.characterSelectList);
    // add the warrior class thumbnail
    self.addClassThumbnail(self.classWarrior);
    // add the mage class thumbnail
    self.addClassThumbnail(self.classMage);
    // add the rogue class thumbnail
    self.addClassThumbnail(self.classRogue);
  };
  
  // adds a single class type''s thumbnail
  // @param Class class The class type object to load
  this.addClassThumbnail = function (classType) {
    // the list item to add to the selection list
    var classListItem = $('<li></li>'),
    // the thumbnail for this class
    classThumbnail = $('<a class="selectClass"></a>');
    // add this list item to the class selection list
    self.characterSelectList.append(classListItem);
    // add the thumbnail to the class list item
    classListItem.append(classThumbnail);
    // add the correct id to the thumbnail
    classThumbnail.attr('id', 'class' + classType.name);
    // add the correct background-image to the thumbnail
    classThumbnail.css({'background-image' : 'url(' + classType.images.front + ')'});
  };

  // selects a class type by clicking on it
  // @param Event e The click event that caused the selection
  this.selectClassType = function (e) {
    // get the element that was clicked on
    var element = $(e.target);
    // get the id of the thumbnail that was clicked
    self.selectedClassType = element.attr('id');
    // load the associated class type
    self.loadClassType();
  };

  // confirms a class type by clicking the next arrow
  this.confirmClassType = function () {
    // the text field that holds the name
    var textField = self.characterNameFieldHolder.find('input').first(),
    // the name that the user filled in
    name = textField.val();
    // check that the user has filled in a name
    if (name !== undefined && name !== '') {
      // set the character name
      self.characterName = name;
      // load the description for this class type
      self.loadClassDescription(); 
    } else {
      // add an error class to the text field
      textField.addClass('error').val('Player One');
      // set the character name
      self.characterName = 'Player One';
    }
  };

  // select a new class type by clicking the previous arrow
  this.selectNewClassType = function () {
    // empty out the character element and remove the selected class
    self.characterElement.empty().removeClass('selected');
    // empty out and hide the statistics element
    self.statisticsElement.empty().detach();
    // empty out the character name field holder
    self.characterNameFieldHolder.empty();
    // empty out and show the class type selection list
    self.characterSelectList.empty().show();
    // remove all click events
    self.removeEvents();
    // re-initialize
    self.initialize();
  };

  // shows the selected class type abilities
  this.showAbilities = function () {
    // the lore paragraph
    var lore = self.characterElement.find('.lore'),
    // the abilities paragraph
    abilities = self.characterElement.find('.abilities');
    // hide the lore paragraph
    lore.hide();
    // show the abilities paragraph
    abilities.show();
  };

  // shows the selected class type lore
  this.showLore = function () {
    // the lore paragraph
    var lore = self.characterElement.find('.lore'),
    // the abilities paragraph
    abilities = self.characterElement.find('.abilities');
    // hide the abilities paragraph
    abilities.hide();
    // show the lore paragraph
    lore.show();
  };

  // starts the game with the selected character
  this.play = function () {
    // a new map object
    var map = new Map();
    // remove the container element
    self.container.detach();
    // add the player name to the current class
    self[self.selectedClassType].characterName = self.characterName;
    // initialize the map
    map.initialize(self[self.selectedClassType]);
  };

  // adds the events for the character slection screen
  this.addEvents = function () {
    // add an event for when a different class type gets selected
    $(document).on('click', '.selectClass', self.selectClassType);
    // add an event for when the next arrow is clicked and a class type is selected
    $(document).on('click', '.next', self.confirmClassType);
    // add an event for when the previous arrow is clicked and a new class is selected
    $(document).on('click', '.prev', self.selectNewClassType);
    // add an event to show the class type abilities
    $(document).on('click', '.showAbilities', self.showAbilities);
    // add an event to show the class type lore
    $(document).on('click', '.showLore', self.showLore);
    // add an event for when the play button is clicked
    $(document).on('click', '.playButton', self.play);
  };

  // removes all events
  this.removeEvents = function () {
    // remove all event from document
    $(document).off();
  };
  
  // set the self variable equal to this class
  self = this;
}