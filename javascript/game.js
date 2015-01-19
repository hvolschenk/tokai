// the main game controller
// will load in the correct areas when necessary
function Game () {

  // holds the character select area of the game
  this.characterSelect;
  // holds the map area of the game
  this.map;
  // holds the arena for fighting
  this.arena;
  // holds the width of this element
  this.width = 1200;
  // holds the height of this element
  this.height = 700;
  // holds the left hand side menu
  this.leftMenu = $('<div class="leftMenu"></div>');
  // holds the center game area
  this.gameArea = $('<div class="gameArea"></div>');
  // holds the right hand side menu
  this.rightMenu = $('<div class="rightMenu"></div>');
  // the preloader element
  this.preloaderElement = $('<div class="preloader"></div>');

};

// this class extends the BaseObject class
Game.inheritsFrom(BaseObject);

// the type of this class
Game.prototype.type = 'game';

// adds the element to the page
// @param htmlElement parentElement The parent element to append this one to
Game.prototype.addElement = function (parentElement) {
  // call the parent addElement method
  this.parent.addElement.call(this, parentElement);
  // setup add the left menu, center game area and right menu to the game element
  this.addInnerElements();
};

// adds the inner elements to the game element
Game.prototype.addInnerElements = function () {
  // add all three elements to the page
  this.element.append(this.leftMenu, this.gameArea, this.rightMenu);
};

// starts the game
Game.prototype.startCharacterSelect = function () {
  // preload the images
  this.preloadImages();
  // hide the element
  this.element.hide();
  // create a new character select object
  this.characterSelect = new CharacterSelect(this);
  // initialize the character select screen
  this.characterSelect.initialize();
  // add the game element to the page
  this.addElement();
  // add the character select element to the page
  this.characterSelect.addElement(this.gameArea);
  // set up the charcter select events
  this.characterSelect.setupEvents();
};

// start playing the game
Game.prototype.start = function () {
  // remove character select events
  this.characterSelect.removeEvents();
  // create a new map object
  this.map = new Map(this);
  // add the player to the map
  this.map.player = this.characterSelect.classes[this.characterSelect.selectedClass];
  // initialize the map
  this.map.initialize();
  // empty the left menu, game area and right menu
  this.leftMenu.empty();
  this.gameArea.empty();
  this.rightMenu.empty();
  // add the map element to the game area
  this.map.addElement(this.gameArea);
  // add the store to the left menu
  this.leftMenu.append(this.map.store.element);
  // add the console to the right menu
  this.rightMenu.append(this.map.console);
  // add the welcome text to the console
  this.map.log('Move around and explore with the arrow keys. Press "I" to open the inventory.');
  // setup the player events
  this.map.player.setupEvents();
  // setup the map events
  this.map.player.inventory.setupEvents();
  // setup the store events
  this.map.store.setupEvents();
};

// start a fight
// @param BaseClass opponent The class type being fought against
Game.prototype.startFight = function (opponent) {
  // create a new arena object
  this.arena = new Arena(this, opponent);
  // initialize the arena
  this.arena.initialize();
  // remove all player events
  this.map.player.removeEvents();
  // build the player statistics with the name
  this.map.player.buildStatistics(true);
  // build the opponent statistics with the name
  opponent.buildStatistics(true);
  // hide the map for now
  this.map.element.hide();
  // add the arena element to the gameArea
  this.arena.addElement(this.gameArea);
  // add the player ability list to the left menu
  this.leftMenu.append(this.map.player.abilityListElement);
  // hide the console in the right menu
  this.rightMenu.find('.console').hide();
  // hide the store in the left menu
  this.leftMenu.find('.store').hide();
  // add the opponent ability list to the right menu
  this.rightMenu.append(opponent.abilityListElement);
  // start the fight
  this.arena.startFight();
};

// ends a fight in progress
Game.prototype.endFight = function () {
  // remove the arena from the game area
  this.arena.element.detach();
  // remove all arena events
  this.arena.removeEvents();
  // check if the player died
  if (this.map.player.healthCurrent <= 0) {
    // reset the player's inventory to the original one
    this.map.player.inventory = $.extend(true, {}, this.map.inventoryOnStart);
    // re initialize the map
    this.map.initialize();
  } else {
    // kill the opponent
    this.arena.opponent.kill();
    // add the enemy element back to the map
    this.arena.opponent.addElement(this.map.element);
    // add the player back to the map
    this.map.player.addElement(this.map.element);
    // pick up the opponent's dropped items
    this.map.player.takeOpponentItems(this.arena.opponent);
    // re-initialize the player to reset health etc
    this.map.player.initialize();
  }
  // remove left menu abilityList from fight
  this.leftMenu.find('.abilityList').remove();
  // remove right menu abilityList from fight
  this.rightMenu.find('.abilityList').remove();
  // show the console
  this.rightMenu.find('.console').show();
  // show the store
  this.leftMenu.find('.store').show();
  // show the map
  this.map.element.show();
  // set up the player events
  this.map.player.setupEvents();
  // set up the inventory events
  this.map.player.inventory.setupEvents();
  // setup the store events
  this.map.store.setupEvents();
};

// builds a list of all images to preload
Game.prototype.buildPreloadList = function () {
  // a list of objects to check images in for
  var objectTypes = [
    'Map', 'CharacterSelect', 'Arena',
    'ClassWarrior', 'ClassMage', 'ClassRogue', 'ClassSpider',
    'EnvironmentPath', 'EnvironmentRock', 'EnvironmentTree', 'EnvironmentExit', 'EnvironmentWater',
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

// pre-loads the images
Game.prototype.preloadImages = function () {
  // a list of images to preload
  var images = this.buildPreloadList(),
  // a count of total images
  totalImages = images.length,
  // a count of loaded images
  loadedImages = 0,
  // the percentage that have been loaded
  percentage = 0,
  // a reference to this class
  self = this;
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
        // show the element
        self.element.show();
      }
    });
    // add the image to the document
    //$('body').append(image);
  });
};

// shows the preloader
Game.prototype.showPreloader = function () {
  // the body element
  var body = $('body'),
  // an empty paragraph element
  paragraph = $('<p></p>');
  // add the empty paragraph to the preloader element
  this.preloaderElement.append(paragraph);
  // add the preloader element to the page
  body.append(this.preloaderElement);
};

// hides the preloader element
Game.prototype.hidePreloader = function () {
  // empty and detach the preloader element
  this.preloaderElement.empty().detach();
};