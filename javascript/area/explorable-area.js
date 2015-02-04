// any explorable area
// @param object game The game currently being played
function ExplorableArea (game) {
  
  // call the base object
  BaseObject.call(this, game);
  
  // the width of the area
  this.width = 600;
  // the height of the area
  this.height = 600;
  // holds a list of objects on the page
  this.objects = [];
  // a list of all the fog of war blocks
  this.fog = [];
  
};

// this class extends base object
ExplorableArea.inheritsFrom(BaseObject);

// adds a type to this class
ExplorableArea.prototype.type = 'area';

/**
 * Loads the area from a file
 * @param {String} type The type of area to load
 * @param {String} identifier The file identifier
 */
ExplorableArea.prototype.load = function (type, identifier) {
  // a reference to this object
  var self = this;
  // read the correct JSON file
  $.ajax({
    type     : 'get',
    dataType : 'json',
    url      : type + 's/' + type + identifier + '.json',
    success  : function (data) {
      // load all objects on the area
      self.loadObjects(data);
      // clear the fog of war
      self.clearFogOfWar();
    },
    error    : function (jqXHR, textStatus, errorThrown) {
      console.log('error', jqXHR, textStatus, errorThrown);
    }
  });
  // add the fog of war to the area
  this.loadFogOfWar();
};

// loads all area data
// @param json data The data to load
ExplorableArea.prototype.loadObjects = function (data) {
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
ExplorableArea.prototype.loadObjectType = function (type, data, newObject) {
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
      // add this object to the area
      self.objects.push(object);
    } else {
      // the player is the object
      object = self.player;
    }
    // load this object from data
    object.load(value);
    // initialize the object
    object.initialize();
    // add the object to the area
    object.addElement(self.element);
  });
};

// Loads the areas fog of war
ExplorableArea.prototype.loadFogOfWar = function () {
  // a fog object
  var fog,
  // the amount of rows
  rows = this.height / 60,
  // the amount of columns
  columns = this.width / 60;
  // load 10 rows of fog
  for (var row = 0; row < rows; row++) {
    // load 10 columns of fog per row
    for (var column = 0; column < columns; column++) {
      // create a new fog object
      fog = new EnvironmentFog(this.game);
      // set the top and left offsets of the fog
      fog.position = {top : row, left : column};
      // initialize the fog
      fog.initialize();
      // add the fog to the list
      this.fog.push(fog);
      // add the fog element to the area
      fog.addElement(this.element);
    }
  }
};

// clears out the fog of war around the player
ExplorableArea.prototype.clearFogOfWar = function () {
  // a reference to this class
  var self = this,
  // the player
  player = this.player;
  // go through each fog of war block
  $.each(this.fog, function () {
    // the player's top offset
    var playerTop = player.position.top,
    // the player's left offset
    playerLeft = player.position.left,
    // the fog's top offset
    fogTop = this.position.top,
    // the fog's left offset
    fogLeft = this.position.left,
    // the element
    element = this.element;
    // remove all related classes from the element
    element.removeClass('semi clear');
    // see if this fog has been discovered
    if (this.discovered === true) {
      // add a discovered class to the element
      element.addClass('discovered');
    }
    // check if the fog is within 3 units of the player
    if (fogTop < playerTop + 3 && fogTop > playerTop - 3 && fogLeft < playerLeft + 3 && fogLeft > playerLeft - 3) {
      // add a clear class to this fog
      element.addClass('semi');
      // this fog has now been discovered
      this.discovered = true;
    }
    // see if the fog is next to the player
    if (fogTop < playerTop + 2 && fogTop > playerTop - 2 && fogLeft < playerLeft + 2 && fogLeft > playerLeft - 2) {
      // add a clear class to this fog
      element.addClass('clear');
    }
  });
};

// find an object on the area
// @param {String} key The key to search for on this object
// @param {String} value The value of the key to look for
ExplorableArea.prototype.findObject = function (key, value) {
  // the object we found
  var object;
  // go through all area objects
  $.each(this.objects, function () {
    // see if this object has the key and it is equal to the value
    if (this[key] === value) {
      // set up the object
      object = this;
      // return false so we exit the loop
      return false;
    }
  });
  // return the object
  return object;
};