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
  // the character name field label
  this.characterNameFieldLabel = $('<label for="characterNameField" class="characterNameFieldLabel">Character Name</label>');
  // the character name input field
  this.characterNameField = $('<input type="text" id="characterNameField" name="characterName" />');
  // the character selection list
  this.characterSelectList = $('<ul class="characterSelectList"></ul>');
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
    // remove the next arrow from the page
    nextArrow.fadeOut(0, function () {nextArrow.remove();});
    // remove the class name from the page
    paragraph.fadeOut(0, function () {paragraph.remove();});
    // add the selected class to the character element
    self.characterElement.addClass('selected');
    // add the previous arrow to the character element
    self.characterElement.append('<a class="prev"></a>');
    // add the class type description to the character element
    self.characterElement.append('<p><span>' + self[self.selectedClassType].name + '</span>' + self[self.selectedClassType].lore + '</p>');
  };




  
  // adds the character name input field
  this.addNameField = function () {
    // append the name field holder to the container
    self.container.append(self.characterNameFieldHolder);
    // add the label to the character name field holder
    self.characterNameFieldHolder.append(self.characterNameFieldLabel);
    // add the input field to the chatacter name field holder
    self.characterNameFieldHolder.append(self.characterNameField);
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
  // @param Event e The click event that caused the confirmation
  this.confirmClassType = function (e) {
    // load the description for this class type
    self.loadClassDescription();
  };

  // adds the events for the character slection screen
  this.addEvents = function () {
    // add an event for when a different class type gets selected
    $(document).on('click', '.selectClass', self.selectClassType);
    // add an event for when the next arrow is clicked and a class type is selected
    $(document).on('click', '.next', self.confirmClassType);
  };
  
  // set the self variable equal to this class
  self = this;
}