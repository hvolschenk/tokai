// The character selection screen
// @param Game game The game that is currently being played
function CharacterSelect (game) {

  // call the bas eobject
  BaseObject.call(this, game);

  // the name that was chosen
  this.name = '';
  // the width for the character slect screen
  this.width = 600;
  // the height for the character select screen
  this.height = 590;
  // the background image for the character select screen
  this.image = [
    'images/area/character-select/background.jpg',
    'images/area/character-select/next-arrow.png',
    'images/area/character-select/prev-arrow.png'
  ];
  // load the image a s a background image
  this.imageAsBackground = true;
  // the currently selected image
  this.currentImage = 0;
  // the name area where the player types his/her character name
  this.nameArea = $('<div></div>');
  // the player area where the selected class is shown
  this.playerArea = $('<div></div>');
  // the classes area where all classes will be shown
  this.classesArea = $('<div></div>');
  // the classes that can be chosen between
  this.classList = [ClassWarrior, ClassMage, ClassRogue];
  // a list of instantiated classes
  this.classes = [];
  // the selected class
  this.selectedClass = 0;
  // events for this object
  this.events = {
    '13' : this.confirmClass,
    '39' : this.selectNextClass,
    '37' : this.selectPreviousClass,
    'click .next' : this.confirmClass,
    'click .previous' : this.changeClass,
    'click .classes .object' : this.selectClass,
    'blur .name input' : this.setName,
    'click .showAbilities' : this.showAbilities,
    'click .showLore' : this.showLore,
    'click .playButton' : this.play
  };
  // whether the class has been confirmed
  this.confirmed = false;

};

// this class is a child of BaseObject
CharacterSelect.inheritsFrom(BaseObject);

// the type of this class
CharacterSelect.prototype.type = 'characterSelect';


// an initialization function for the object
CharacterSelect.prototype.initialize = function () {
  // call the parent initialize method
  this.parent.initialize.call(this);
  // load all the class types
  this.loadClasses();
};

// adds the element to the page
// @param htmlElement parentElement The parent element to append this one to
CharacterSelect.prototype.addElement = function (parentElement) {
  // call the parent addElement method
  this.parent.addElement.call(this, parentElement);
  // add the inner elements to this element
  this.addInnerElements();
};

// set up the list of instantiated classes
CharacterSelect.prototype.loadClasses = function () {
  // a reference to the CharacterSelect class
  var self = this;
  // go through each of the available classes
  $.each(this.classList, function (index, value) {
    // add this new instantiated class to the list
    self.classes.push(new value(self.game));
    // initialize the class
    self.classes[index].initialize();
  });
};

// adds the inner elements to the character select element
CharacterSelect.prototype.addInnerElements = function () {
  // empty the element
  this.element.empty();
  // add the name area to the element
  this.addNameArea();
  // see whether the class selection has been confimred
  if (this.confirmed === true) {
    // add the confirmed player area to the element
    this.addPlayerAreaConfirmed();
    // add the statistics area with the class statistics and play button
    this.addStatisticsArea();
  } else {
    // add the player area to the element
    this.addPlayerArea();
    // add the classes area to the element
    this.addClassesArea();
  }
};

// adds the name are to the character select area
CharacterSelect.prototype.addNameArea = function () {
  // a new label for the area
  var label = $('<label></label>'),
  // a new input field for the area
  input = $('<input />'),
  // a blank paragraph
  paragraph = $('<p></p>');
  // empty the name area
  this.nameArea.empty();
  // see if the class has been confirmed
  if (this.confirmed === true) {
    // set the text of the empty paragraph
    paragraph.text(this.name);
    // add the paragraph to the name element
    this.nameArea.append(paragraph);
  } else {
    // add the text to the label and the "for" attribute
    label.attr('for', 'name').text('Character name');
    // add the type, name, id, maximum length and classes to the input field
    input.attr('id', 'name').attr('name', 'name').attr('type', 'text').attr('maxlength', 16).addClass('roundedCorners grayArea active');
    // add the current name to the input
    input.val(this.name);
    // add the label and the field to the name area
    this.nameArea.append(label, input);
  }
  // add the correct classes to the name area
  this.nameArea.addClass('name roundedCorners grayArea');
  // add the name area to the element
  this.element.append(this.nameArea);
};

CharacterSelect.prototype.addPlayerArea = function () {
  // the player area
  var player = $('<div></div>'),
  // the selected class element
  element = this.classes[this.selectedClass].element,
  // holds the name of the selected class
  name = $('<p></p>'),
  // the next arrow
  nextArrow = $('<a></a>');
  // set the text of the name element
  name.text(this.classes[this.selectedClass].name);
  // add the appropriate class to the name element
  name.addClass('name roundedCorners grayArea');
  // add the name to the player area
  player.append(name);
  // clone and add the element to the player element remove inline styles
  player.append(element.clone().removeAttr('style'));
  // add the appropriate class to the next arrow
  nextArrow.addClass('next');
  // add the next image to the arrow
  nextArrow.append($('<img />').attr('src', this.image[1]));
  // add the next arrow to the player element
  player.append(nextArrow);
  // add the appropriate class to the player area
  player.addClass('player');
  // add the player element to the character select element
  this.element.append(player);
};

// adds the confirmed player area
CharacterSelect.prototype.addPlayerAreaConfirmed = function () {
  // the player area
  var player = $('<div class="player roundedCorners grayArea confirmed"></div>'),
  // the previous arrow
  previousArrow = $('<a></a>'),
  // the selected class
  classType = this.classes[this.selectedClass],
  // the abilities button
  abilitiesButton = $('<a class="button roundedCorners grayArea showAbilities active">Abilities</a>'),
  // the lore button
  loreButton = $('<a class="button roundedCorners grayArea showLore">Lore</a>'),
  // a paragraph for the lore
  loreParagraph = $('<p class="lore">' + classType.lore + '</p>');
  // add the selected class image, class's abilities, previous arrow, abilities button and the lore button
  player.append(classType.element.clone().removeAttr('style'), classType.abilityListElement, loreParagraph, previousArrow, abilitiesButton, loreButton);
  // add the correct image to the previous arrow
  previousArrow.append($('<img class="previous" />').attr('src', this.image[2]));
  // add the player element to the element
  this.element.append(player);
};

// adds the classes area to the character select area
CharacterSelect.prototype.addClassesArea = function () {
  // an unordered list to add to the classes area
  var list = $('<ul></ul>'),
  // the character select class
  self = this;
  // go through each class to add it to the area
  $.each(this.classes, function (index, value) {
    // a list item to add to the list
    var item = $('<li></li>');
    // add the object's element to the list item
    value.addElement(item);
    // add the list item to the list
    list.append(item);
    // add the correct classes to the item
    item.addClass('roundedCorners grayArea');
    // see if this is the currently selected item
    if (self.selectedClass === index) {
      // add the active class to the item
      item.addClass('active');
    }
  });
  // add the appropriate class to the list
  list.addClass('classes');
  // add the list to the character select area
  this.element.append(list);
};

// adds the statistics area and play button to the character select screen
CharacterSelect.prototype.addStatisticsArea = function () {
  // the statistics area
  var statisticsArea = $('<div class="roundedCorners grayArea statistics"></div>'),
  // the class type that is selected
  classType = this.classes[this.selectedClass],
  // the play button
  playButton = $('<a class="playButton roundedCorners grayArea">Play</a>');
  // add the class statistics element and the play button to the statistics area
  statisticsArea.append(classType.statistics, playButton);
  // add the statistics area to the character select screen
  this.element.append(statisticsArea);
};

// select a class
// @param event evet The click event that caused the class selection
CharacterSelect.prototype.selectClass = function (event) {
  // the element that was clicked on
  var classElement = $(event.target).closest('li'),
  // the list of classes
  classList = this.element.find('.classes li');
  // the index of this class in the list
  index = classList.index(classElement);
  // set this class as the selected one
  this.selectedClass = index;
  // re-add the inner elements
  this.addInnerElements();
};

// select the next class
CharacterSelect.prototype.selectNextClass = function () {
  // see if we are at the last class
  if (this.selectedClass === this.classes.length - 1) {
    // go back to the first one
    this.selectedClass = 0;
  } else {
    // go to the next class
    this.selectedClass++;
  }
  // re-add the inner elements
  this.addInnerElements();
};

// select the previous class
CharacterSelect.prototype.selectPreviousClass = function () {
  // see if we are on the first class
  if (this.selectedClass === 0) {
    // the last class is the selected one
    this.selectedClass = this.classes.length - 1;
  } else {
    // go to the previous class
    this.selectedClass--;
  }
  // re-add the inner elements
  this.addInnerElements();
};

// set the name of the player
CharacterSelect.prototype.setName = function () {
  // the name input
  var input = this.element.find('input');
  // set the value of the name
  this.name = input.val();
};

// whe pressing next and confirming class
CharacterSelect.prototype.confirmClass = function () {
  // the name input field
  var input = this.element.find('input');
  // see that this class hasn't already been confirmed
  if (this.confirmed === false) {
    // see if the name input has been filled in
    if (input.val() === '') {
      // set a new value for the name input
      input.val('Player One');
      // add an error class to the input
      input.addClass('error');
      // set the new name for this player
      this.setName();
    } else {
      // this class is now confirmed
      this.confirmed = true;
      // re-add the inner elements
      this.addInnerElements();
    }
  }
};

// when pressing previous and rather selecting a different class
CharacterSelect.prototype.changeClass = function () {
  // see whether this class is already confirmed
  if (this.confirmed === true) {
    // this class is not not confirmed anymore
    this.confirmed = false;
    // re-add the inner elements
    this.addInnerElements();
  }
};

// show the abilities
CharacterSelect.prototype.showAbilities = function () {
  // the abilities section
  var abilities = this.element.find('.abilityList'),
  // the lore section
  lore = this.element.find('.lore'),
  // the abilities button
  abilitiesButton = this.element.find('.showAbilities'),
  // the lore button
  loreButton = this.element.find('.showLore');
  // hide the lore section
  lore.hide();
  // remove the active class from the lore button
  loreButton.removeClass('active');
  // show the ability list
  abilities.show();
  // add the active class to the abilities button
  abilitiesButton.addClass('active');
};

// show the lore
CharacterSelect.prototype.showLore = function () {
  // the lore section
  var lore = this.element.find('.lore'),
  // the abilities section
  abilities = this.element.find('.abilityList'),
  // the lore button
  loreButton = this.element.find('.showLore'),
  // the abilities button
  abilitiesButton = this.element.find('.showAbilities');
  // hide the ability list
  abilities.hide();
  // remove the active class from the abilities button
  abilitiesButton.removeClass('active');
  // show the lore section
  lore.show();
  // add the active class to the lore button
  loreButton.addClass('active');
};

// play the game
CharacterSelect.prototype.play = function () {
  // start playing the game
  this.game.start();
};