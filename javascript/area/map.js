// the main map
// @param object game The game currently being played
function Map (game) {
  
  // call the base object
  BaseObject.call(this, game);
  
  // the width of the map
  this.width = 600;
  // the height of the map
  this.height = 600;
  // holds a list of objects on the page
  this.objects = [];
  // the background image for the map
  this.image = 'images/area/map/map-background.jpg';
  // this image is a background image
  this.imageAsBackground = true;
  // the current map that we are on
  this.map = 1;
  // the player's inventory at the start of the game
  this.inventoryOnStart = [];
  // the console
  this.console = $('<textarea readonly="readonly" class="console"></textarea>');
  // the last logged console message (to prevent duplicates)
  this.lastLogMessage = '';
  
};

// this class extends base object
Map.inheritsFrom(BaseObject);

// adds a type to this class
Map.prototype.type = 'map';

// initializes the map
Map.prototype.initialize = function () {
  // call the parent initialize function
  this.parent.initialize.call(this);
  // load the store
  this.store = new Store(this.game);
  // initialize store
  this.store.initialize();
  // load this map
  this.load();
};

// loads the map from a file
Map.prototype.load = function () {
  // a reference to this object
  var self = this;
  // call the parent initialize function
  this.parent.initialize.call(this);
  // read the correct JSON file
  $.ajax({
    type     : 'get',
    dataType : 'json',
    url      : 'maps/map' + this.map + '.json',
    success  : function (data) {
      // load all objects on the map
      self.loadObjects(data);
    },
    error    : function (jqXHR, textStatus, errorThrown) {
      console.log('error', jqXHR, textStatus, errorThrown);
    }
  });
  // add the inventory into the map
  this.player.inventory.addElement(this.element);
  // save a clone of the player's inventory as the map starts
  this.inventoryOnStart = $.extend(true, {}, this.player.inventory);
};

// loads all map data
// @param json data The data to load
Map.prototype.loadObjects = function (data) {
  // a reference to this object
  var self = this;
  // empty out the objects before loading them
  this.objects = [];
  // go through each type found in the data
  $.each(data, function (key, value) {
    // whether or not to load a new class
    var newClass = true;
    // check if we are loading the player
    if (key === 'Player') {
      // get the type of character that was loaded
      key = 'Class';
      value[0].type = self.player.constructor.name.replace('Class', '');
      // a new class is not necessary
      newClass = false;
    }
    // load the data for this object type
    self.loadObjectType(key, value, newClass);
  });
};

// loads a single object type
// @param string type The type of object to load
// @param object data The data to load
// @ param boolean newObject create a new object or load the player
Map.prototype.loadObjectType = function (type, data, newObject) {
  // the name of the class to load
  var className,
  // a reference to this object
  self = this;
  // go through each data as it will be an array
  $.each(data, function (key, value) {
    // holds a new instance of a type
    var object = null;
    // check if a name is given
    if (value.type) {
      // set the class name
      className = (window[type + value.type]) ? type + value.type : 'Base' + type;
    } else {
      // set the class name
      className = 'Base' + type;
    }
    // check if we are loading the player
    if (newObject === true) {
      // create a new instance of this type
      object = new window[className](self.game);
      // add this object to the map
      self.objects.push(object);
    } else {
      // the player is the object
      object = self.player;
    }
    // load this object from data
    object.load(value);
    // initialize the object
    object.initialize();
    // add the object to the map
    object.addElement(self.element);
  });
};

// log an entry to the console
// @param {String} logText The text to log
Map.prototype.log = function (logText) {
  // the length of the log message
  var length = logText.length,
  // the index of the current character
  currentCharacter = 0,
  // a reference to this class
  self = this,
  // the timed function
  timedFunction;
  // make sure this is not the previous message
  if (logText !== this.lastLogMessage) {
    // set an interval to add one letter at a time
    timedFunction = setInterval(function () {
      // the letter to add
      var letter = logText[currentCharacter];
      // add the letter to the console
      self.console.append(letter);
      // increment the character counter
      currentCharacter++;
      // check if the current character is past the length of the text
      if (currentCharacter > length) {
        // add a linebreak to the console
        self.console.append('\n\n');
        // stop the timed function from running
        clearInterval(timedFunction);
      }
    }, 50);
    // change the last log message to the new one
    this.lastLogMessage = logText;
  }
};