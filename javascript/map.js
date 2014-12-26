// a class file for the map
function Map () {
  
  // this current class
  var self = this;

  // extend the base object with this object
  BaseObject.call(this, self);
  // the default status text
  self.defaultStatusText = 'Move around and explore with the arrow keys.';
  // the width of the map in pixels
  this.mapWidth = 600;
  // the height of the map in pixels
  this.mapHeight = 600;
  // holds a list of objects on the page
  this.objects = [];
  // holds the player''s character
  this.player;
  // holds the map html element
  this.mapElement = $('<div class="map"></div>');
  // holds the status text element
  this.statusTextElement = $('<p class="status"></p>');
  // a triggered event to run on a certain direction
  this.triggeredEvent = {
    direction : null,
    event : null
  };
  // the background image for the map
  this.image = '/images/environment/grass-bg.jpg';
  // the current map that we are on
  this.map = 1;
  // the key events for this object
  this.keys;

  // initializes the map and items on the map
  // @param Object classType The class type that was selected during character select
  this.initialize = function (classType) {
    // load the first map
    self.loadMap(classType);
    // add the map element to the page
    self.addElement();
    // set-up the movement events
    self.setupKeyEvents();
  };

  // adds the map element to the page
  this.addElement = function () {
    // the body element
    var body = $('body');
    // add the map element''s size
    self.mapElement.css({
      width : self.mapWidth,
      height : self.mapHeight
    });
    // add the map to the body
    body.append(self.mapElement);
    // add the initial text to the status text element
    self.statusTextElement.text(self.defaultStatusText);
    // add the status element to the body
    body.append(self.statusTextElement);
  };

  // loads a map from file
  // @param Object classType The class type that was selected during character select
  this.loadMap = function (classType) {
    // read the correct JSON file
    $.ajax({
      type     : 'get',
      dataType : 'json',
      url      : 'maps/map' + this.map + '.json',
      success  : function (data) {
        // load all items
        self.loadItems(data.item);
        // load all enemies
        self.loadEnemies(data.enemy);
        // load all objects
        self.loadObjects(data);
        // load the player onto the map
        self.loadPlayer(data.player, classType);
        // set the key events for this map
        self.keys = {
          37 : self.player.move, // left
          38 : self.player.move, // up
          39 : self.player.move, // right
          40 : self.player.move, // down
          73 : self.player.inventory.toggle
        };
      },
      error    : function (jqXHR, textStatus, errorThrown) {
        console.log('error', jqXHR, textStatus, errorThrown);
      }
    });
  };

  // loads all objects onto the map
  // @param json data The data derived from the map file
  this.loadObjects = function (data) {
    // a list of all types to load
    var objectTypes = ["Path", "Rock", "Tree", "Water", "Exit"];
    // go through each object type
    $.each(objectTypes, function () {
      // see if any objects of this type was found
      if (typeof(data[this.toLowerCase()]) === 'object') {
        var objectType = this;
        // go through each of this type
        $.each(data[this.toLowerCase()], function () {
          // create a new instance of this object type
          var object = new window[objectType](self);
          // initialize the object
          object.initialize(this);
          // add the element to the page
          object.addElement(self.mapElement);
          // add this object to the list of page objects
          self.objects.push(object);
        });
      }
    });
  };

  // loads all enemies onto the map
  // @param json data All enemies to load onto the map
  this.loadEnemies = function (data) {
    // see if any enemies are in the list
    if (data.length > 0) {
      // go through each enemy
      $.each(data, function () {
        // the enemy object
        var enemy;
        // see if an enemy type was set
        if (this.name) {
          // see if an object exists for this enemy type
          if (typeof(window['Enemy' + this.name]) === 'function') {
            // this type has a class, load it
            enemy = new window['Enemy' + this.name](self);
          }
        } else {
          // no enemy type was set, load the base enemy object
          enemy = new BaseEnemy(self);
        }
        // initialize the enemy
        enemy.initialize(this);
        // add the element to the page
        enemy.addElement(self.mapElement);
        // add this enemy to the list of page objects
        self.objects.push(enemy);
      });
    }
  };

  // loads all items onto the map
  // @param json data All enemies to load onto the map
  this.loadItems = function (data) {
    // see if any enemies are in the list
    if (data.length > 0) {
      // go through each item
      $.each(data, function () {
        // the item object
        var item;
        // see if an item type was set
        if (this.name) {
          // see if an object exists for this item type
          if (typeof(window['Item' + this.name]) === 'function') {
            // this type has a class, load it
            item = new window['Item' + this.name](self);
          }
        } else {
          // no item type was set, load the base item object
          item = new BaseItem(self);
        }
        // initialize the item
        item.initialize(this);
        // add the element to the page
        item.addElement(self.mapElement);
        // add this item to the list of page objects
        self.objects.push(item);
      });
    }
  };

  // loads the player onto the map
  // @param JSON player The player that must be loaded
  // @param Object classType The class type that was selected during character select
  this.loadPlayer = function (player, classType) {
    // add this player to the class variables
    self.player = classType;
    // initialize the Player
    self.player.initialize(player);
    // add the player object to the page
    self.player.addElement(self.mapElement);
    // initializze the player's inventory
    self.player.inventory.initialize();
    // add the inventory element to the map
    self.player.inventory.addElement(self.mapElement);
  };
  
  // adds a clash handler method
  this.clashHandler = function () {
    // update status text
    self.statusTextElement.text('Find your house to leave this map.');
  };
  
  // adds a triggered event to the map
  this.addTriggeredEvent = function (direction, event) {
    // set the trigger''s direction
    self.triggeredEvent.direction = direction;
    // set the triggered event''s event
    self.triggeredEvent.event = event;
  };

  // set up the keypress events
  this.setupKeyEvents = function () {
    // set up a keydown handler for when keys get pressed
    $(document).on('keydown', function (event) {
      // see if a function exists for this key
      if (self.keys[event.keyCode]) {
        // execute the function
        self.keys[event.keyCode](event);
      }
    });
  };

  // unbinds all events
  this.removeEvents = function () {
    // remove all events
    $(document).off();
  };
  
  // loads the arena for fighting
  // @param object enemy The enemy that you are fighting
  this.loadArena = function (enemy) {
    // create a new arena object
    var arena = new Arena(self, enemy),
    // the body element
    body = $('body');
    // hide the map element
    self.mapElement.hide();
    // hide the status text area
    self.statusTextElement.hide();
    // hide the inventory
    self.player.inventory.element.hide();
    // remove all events
    self.removeEvents();
    // initialize the arena
    arena.initialize();
    // build the arena element
    arena.addElement(body);
  };

  // loads the arena for fighting
  // @param object enemy The enemy that you are fighting
  this.loadStore = function (store) {
    // create a new store object
    var store = new Store(self),
    // the body element
    body = $('body');
    // initialize the arena
    store.initialize();
    // build the arena element
    store.addElement(body);
  };

}