function CharacterSelect () {

  // this current class
  var self = this;
  
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
  this.statisticsElement = $('<div class="statistics"></div>');
  // the preloader element
  this.preloaderElement = $('<div class="preloader"></div>');
  // a new map object
  this.map = new Map();
  // a instance of the warrior class
  this.classWarrior = new ClassWarrior(self.map);
  // a instance of the mage class
  this.classMage = new ClassMage(self.map);
  // a instance of the rogue class
  this.classRogue = new ClassRogue(self.map);
  // the selected class type
  this.selectedClassType = 'classWarrior';
  // the background image for the character select screen
  this.image = [
    '/images/back.jpg',
    '/images/next-arrow.png',
    '/images/prev-arrow.png'
  ];
  
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
    // preload all images
    self.preloadImages();
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
    self.characterElement.css({'background-image' : 'url(' + self[self.selectedClassType].image[2] + ')'});
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
    // update the clas type abilty list element
    self[self.selectedClassType].buildAbilityList();
    // add the ability list element to the character element
    self.characterElement.append(self[self.selectedClassType].abilityList);
  };

  // loads a class type description, list section
  this.loadClassDescriptionList = function () {
    // the unordered list to add to the character element
    var list = $('<ul></ul>'),
    // the "abilities" list item to add to the list
    listItemAbilities = $('<li><a class="showAbilities">Abilities</a></li>'),
    // the "lore" list item to add to the list
    listItemLore = $('<li><a class="showLore">Lore</a></li>');
    // add the list item to the character element
    self.characterElement.append(list);
    // add the "abilities" list item to the list
    list.append(listItemAbilities);
    // add the "lore" list item to the list
    list.append(listItemLore);
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
    classThumbnail.css({'background-image' : 'url(' + classType.image[2] + ')'});
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
    // show the abilities and hide the lore
    self.showAbilities();
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
    abilities = self.characterElement.find('.abilityList');
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
    abilities = self.characterElement.find('.abilityList');
    // hide the abilities paragraph
    abilities.hide();
    // show the lore paragraph
    lore.show();
  };

  // starts the game with the selected character
  this.play = function () {
    // remove the container element
    self.container.detach();
    // add the player name to the current class
    self[self.selectedClassType].characterName = self.characterName;
    // initialize the map
    self.map.initialize(self[self.selectedClassType]);
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

  // pre-loads the images
  this.preloadImages = function () {
    // a list of images to preload
    var images = self.buildPreloadList(),
    // a count of total images
    totalImages = images.length,
    // a count of loaded images
    loadedImages = 0,
    // the percentage that have been loaded
    percentage = 0;
    // show the preloader element
    self.showPreloader();
    // go through all images to preload
    $.each(images, function () {
      // an image element
      var image = $('<img />')
      // don't display the image
      .css('display', 'none').addClass('hidden preload')
      // set the source of the image
      .attr('src', this)
      // build an event for when the image has finished loading
      .load(function () {
        // increment the amount of images loaded
        loadedImages++;
        // get the percentage that the images are loaded
        percentage = Math.round((loadedImages / totalImages) * 100, 0);
        // set the percentage on the preloader element
        self.preloaderElement.find('p').text(percentage + '%');
        // check if preloading is complete
        if (percentage === 100) {
          // hide the preloader
          self.hidePreloader();
        }
      });
      // add the image to the document
      $('body').append(image);
    });
  };

  // shows the preloader
  this.showPreloader = function () {
    // the body element
    var body = $('body'),
    // an empty paragraph element
    paragraph = $('<p></p>');
    // add the empty paragraph to the preloader element
    self.preloaderElement.append(paragraph);
    // add the preloader element to the page
    body.append(self.preloaderElement);
  };

  // hides the preloader element
  this.hidePreloader = function () {
    // empty and detach the preloader element
    self.preloaderElement.empty().detach();
  };

  // builds a list of all images to preload
  this.buildPreloadList = function () {
    // a list of objects to check images in for
    var objectTypes = [
      'Map', 'CharacterSelect',
      'ClassWarrior', 'ClassMage', 'ClassRogue',
      'EnemyShadowling',
      'Path', 'Rock', 'Tree',
      'ItemAxe'
    ],
    // a loaded version of each type
    loadedObjectType,
    // a list of images to return
    images = [];
    // go through each object type
    $.each(objectTypes, function () {
      // clear the loaded object type
      loadedObjectType = undefined;
      // see if a class exists for this type
      if (typeof(window[this]) === 'function') {
        // load the objectType
        loadedObjectType = new window[this];
        // see if the type has images
        if (loadedObjectType.image) {
          // see if the image is an array
          if (typeof(loadedObjectType.image) === 'object') {
            // merge the arrays
            images = images.concat(loadedObjectType.image);
          }
          else {
            // add this item to the array
            images.push(loadedObjectType.image);
          }
        }
      }
    });
    // return the list of images
    return images;
  };
  
}