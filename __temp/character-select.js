function CharacterSelect () {
  // this current class
  var self;
  
  // the character''s name
  this.characterName = '';
  // the character class
  this.characterClass = '';
  // the container element that will hold the character selection screen
  this.container = $('<div class="container"></div>');
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
  
  // initializes the charcter selection screen
  this.initialize = function () {
    // add the container element
    self.addElement();
    // add the character name field
    self.addNameField();
    // add the class thumbnails to the page
    self.addClassThumbnails();
  };
  
  // adds the container element to the page
  this.addElement = function () {
    // get the body element
    var body = $('body');
    // add the container to the body
    body.append(self.container);
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
    // add the correct background-image to the thumbnail
    classThumbnail.css({'background-image' : 'url(' + classType.images.front + ')'});
  };
  
  // set the self variable equal to this class
  self = this;
}