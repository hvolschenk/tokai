// a class file for the map
function Map () {
  
  // this current class
  var self,
  // the default status text
  defaultStatusText = 'Move around and explore with the arrow keys.',
  // whether the arena is open or closed
  arenaMode = false;
  
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

  // initializes the map and items on the map
  this.initialize = function () {
    // load the first map
    self.loadMap();
    // add the map element to the page
    self.addElement();
    // set-up the movement events
    self.setupEvents();
  }

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
    self.statusTextElement.text(defaultStatusText);
    // add the status element to the body
    body.append(self.statusTextElement);
  }

  // loads a map from file
  // @param integer map The map number
  this.loadMap = function (map) {
    // set the first map as the default
    map = map || 1;
    // read the correct JSON file
    $.ajax({
      type     : 'get',
      dataType : 'json',
      url      : 'maps/map' + map + '.json',
      success  : function (data) {
        // load the player onto the map
        self.loadPlayer(data.player);
        // load the inventory element onto the map
        self.loadInventory();
        // load all objects
        self.loadObjects(data);
      },
      error    : function (jqXHR, textStatus, errorThrown) {
        console.log('error', jqXHR, textStatus, errorThrown);
      }
    });
  }

  // loads all objects onto the map
  // @param json data The data derived from the map file
  this.loadObjects = function (data) {
    // a list of all types to load
    var objectTypes = ["Rock", "Enemy", "Tree", "Item", "Water"];
    // go through each object type
    $.each(objectTypes, function () {
      // see if any objects of this type was found
      if (data[this.toLowerCase()].length > 0) {
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
  }

  // loads the player onto the map
  // @param JSON player The player that must be loaded
  this.loadPlayer = function (player) {
    // create a new Player object
    playerObject = new Player(self);
    // initialize the Player
    playerObject.initialize(player);
    // add the player object to the page
    playerObject.addElement(self.mapElement);
    // add this player to the class variables
    self.player = playerObject;
  }
  
  // loads the inventory onto the map
  this.loadInventory = function () {
    // add the inventory element to the page
    self.player.inventory.addElement();
  }
  
  // detects a clash between the player and any object
  // @param string direction The direction in which the player is trying to move
  // @return boolean Whether the player clashes or not (true = clash)
  this.detectClash = function (direction) {
    // a list of object types to go through
    var objectTypes = ['objects'],
    // whether a clash has happened
    clash = self.detectMapClash(direction);
    // see if the player hasn''t gone out of bounds
    if (clash === false) {
      // go through each object type
      $.each(objectTypes, function () {
        // go through each of this type''s items
        $.each(self[this], function () {
          // see which direction we are moving in
          switch (direction) {
            case 'left':
              // see if this item is to the direct left of the player
              if (self.player.left - self.player.playerMoveSize >= this.left &&
                  self.player.left - self.player.playerMoveSize < this.right &&
                  self.player.bottom > this.top && self.player.top < this.bottom) {
                // clash detected
                clash = this;
              }
              break;
            case 'up':
              // see if this item is to the direct left of the player
              if (self.player.top - self.player.playerMoveSize >= this.top &&
                  self.player.top - self.player.playerMoveSize < this.bottom &&
                  self.player.right > this.left && self.player.left < this.right) {
                // clash detected
                clash = this;
              }
              break;
            case 'right':
              // see if this item is to the direct left of the player
              if (self.player.right + self.player.playerMoveSize > this.left &&
                  self.player.left + self.player.playerMoveSize < this.right &&
                  self.player.bottom > this.top && self.player.top < this.bottom) {
                // clash detected
                clash = this;
              }
              break;
            case 'down':
              // see if this item is to the direct left of the player
              if (self.player.bottom + self.player.playerMoveSize > this.top &&
                  self.player.top + self.player.playerMoveSize < this.bottom &&
                  self.player.right > this.left && self.player.left < this.right) {
                // clash detected
                clash = this;
              }
              break;
          }
        });
      });
    
    }
    // return the result
    return clash;
  }
  
  // detects a clash between the player and the map
  // @param string direction The direction in which the player is trying to move
  // @return boolean Whether the player clashes or not (true = clash)
  this.detectMapClash = function (direction) {
    // whether the player is clashing into the bounds of the map
    var clash = false;
    // see which direction the player is going
    switch (direction) {
      case 'left':
        //see if the player clashes
        if (self.player.left - self.player.playerMoveSize < 0) {
          // the player clashes
          clash = true;
        }
        break;
      case 'up':
        //see if the player clashes
        if (self.player.top - self.player.playerMoveSize < 0) {
          // the player clashes
          clash = true;
        }
        break;
      case 'right':
        //see if the player clashes
        if (self.player.right + self.player.playerMoveSize > self.mapWidth) {
          // the player clashes
          clash = true;
        }
        break;
      case 'down':
        //see if the player clashes
        if (self.player.bottom + self.player.playerMoveSize > self.mapHeight) {
          // the player clashes
          clash = true;
        }
        break;
    }
    // return the result
    return clash === false ? clash : self;
  }
  
  // adds a clash handler method
  this.clashHandler = function () {
    // update status text
    self.statusTextElement.text('Find your house to leave this map.');
  }
  
  // adds a triggered event to the map
  this.addTriggeredEvent = function (direction, event) {
    // set the trigger''s direction
    self.triggeredEvent.direction = direction;
    // set the triggered event''s event
    self.triggeredEvent.event = event;
  }
  
  // sets up the keyboard events to move this player
  this.setupEvents = function () {
    // when the user presses a key
    $(document).keydown(function (event) {
      // the direction the player is trying to move
      var direction = false,
      // the clash detection result
      clashResult = false;
      //swap based on the keyCode
      switch (event.keyCode) {
        case 37:
          direction = 'left';
          break;
        case 38:
          direction = 'up';
          break;
        case 39:
          direction = 'right';
          break;
        case 40:
          direction = 'down';
          break;
      }
      // see if a direction key was pressed
      if (direction !== null) {
        // see if there is a triggered event for this direction
        if (self.triggeredEvent.direction === direction && typeof self.triggeredEvent.event === 'function') {
          // call the triggered event
          self.triggeredEvent.event();
          // reset the triggered event
          self.addTriggeredEvent(null, null);
        } else {
          // reset the triggered event
          self.addTriggeredEvent(null, null);
          // test whether the player clashes
          clashResult = self.detectClash(direction);
          // see if the user is moving into anything
          if (clashResult === false) {
            // move the player in the desired direction
            self.player.movePlayer(direction);
            // reset the text in the status
            self.statusTextElement.text(defaultStatusText);
          } else {
            // see if there is an clash handling method for this type
            if (clashResult.clashHandler) {
              // call the clash handler method
              clashResult.clashHandler(direction);
            }
          }
        }
      }
    });
  }

  // loads the player onto the map
  // @param JSON player The player that must be loaded
  this.loadPlayer = function (player) {
    // create a new Player object
    playerObject = new Player(self);
    // initialize the Player
    playerObject.initialize(player);
    // add the player object to the page
    playerObject.addElement(self.mapElement);
    // add this player to the class variables
    self.player = playerObject;
  }
  
  // loads the inventory onto the map
  this.loadInventory = function () {
    // add the inventory element to the page
    self.player.inventory.addElement();
  }
  
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
    self.player.inventory.inventoryElement.hide();
    // initialize the arena
    arena.initialize();
    // build the arena element
    arena.addElement(body);
    // set the arena mode of the map
    arenaMode = true;
  }
  
  // detects a clash between the player and any object
  // @param string direction The direction in which the player is trying to move
  // @return boolean Whether the player clashes or not (true = clash)
  this.detectClash = function (direction) {
    // a list of object types to go through
    var objectTypes = ['objects'],
    // whether a clash has happened
    clash = self.detectMapClash(direction);
    // see if the player hasn''t gone out of bounds
    if (clash === false) {
      // go through each object type
      $.each(objectTypes, function () {
        // go through each of this type''s items
        $.each(self[this], function () {
          // see which direction we are moving in
          switch (direction) {
            case 'left':
              // see if this item is to the direct left of the player
              if (self.player.left - self.player.playerMoveSize >= this.left &&
                  self.player.left - self.player.playerMoveSize < this.right &&
                  self.player.bottom > this.top && self.player.top < this.bottom) {
                // clash detected
                clash = this;
              }
              break;
            case 'up':
              // see if this item is to the direct left of the player
              if (self.player.top - self.player.playerMoveSize >= this.top &&
                  self.player.top - self.player.playerMoveSize < this.bottom &&
                  self.player.right > this.left && self.player.left < this.right) {
                // clash detected
                clash = this;
              }
              break;
            case 'right':
              // see if this item is to the direct left of the player
              if (self.player.right + self.player.playerMoveSize > this.left &&
                  self.player.left + self.player.playerMoveSize < this.right &&
                  self.player.bottom > this.top && self.player.top < this.bottom) {
                // clash detected
                clash = this;
              }
              break;
            case 'down':
              // see if this item is to the direct left of the player
              if (self.player.bottom + self.player.playerMoveSize > this.top &&
                  self.player.top + self.player.playerMoveSize < this.bottom &&
                  self.player.right > this.left && self.player.left < this.right) {
                // clash detected
                clash = this;
              }
              break;
          }
        });
      });
    
    }
    // return the result
    return clash;
  }
  
  // detects a clash between the player and the map
  // @param string direction The direction in which the player is trying to move
  // @return boolean Whether the player clashes or not (true = clash)
  this.detectMapClash = function (direction) {
    // whether the player is clashing into the bounds of the map
    var clash = false;
    // see which direction the player is going
    switch (direction) {
      case 'left':
        //see if the player clashes
        if (self.player.left - self.player.playerMoveSize < 0) {
          // the player clashes
          clash = true;
        }
        break;
      case 'up':
        //see if the player clashes
        if (self.player.top - self.player.playerMoveSize < 0) {
          // the player clashes
          clash = true;
        }
        break;
      case 'right':
        //see if the player clashes
        if (self.player.right + self.player.playerMoveSize > self.mapWidth) {
          // the player clashes
          clash = true;
        }
        break;
      case 'down':
        //see if the player clashes
        if (self.player.bottom + self.player.playerMoveSize > self.mapHeight) {
          // the player clashes
          clash = true;
        }
        break;
    }
    // return the result
    return clash === false ? clash : self;
  }
  
  // adds a clash handler method
  this.clashHandler = function () {
    // update status text
    self.statusTextElement.text('Find your house to leave this map.');
  }
  
  // adds a triggered event to the map
  this.addTriggeredEvent = function (direction, event) {
    // set the trigger''s direction
    self.triggeredEvent.direction = direction;
    // set the triggered event''s event
    self.triggeredEvent.event = event;
  }
  
  // sets up the keyboard events to move this player
  this.setupEvents = function () {
    // when the user presses a key
    $(document).keydown(function (event) {
      // the direction the player is trying to move
      var direction = false,
      // the clash detection result
      clashResult = false;
      //swap based on the keyCode
      switch (event.keyCode) {
        case 37:
          direction = 'left';
          break;
        case 38:
          direction = 'up';
          break;
        case 39:
          direction = 'right';
          break;
        case 40:
          direction = 'down';
          break;
      }
      // see if a direction key was pressed
      if (direction !== null) {
        // see if there is a triggered event for this direction
        if (self.triggeredEvent.direction === direction && typeof self.triggeredEvent.event === 'function') {
          // call the triggered event
          self.triggeredEvent.event();
          // reset the triggered event
          self.addTriggeredEvent(null, null);
        } else {
          // reset the triggered event
          self.addTriggeredEvent(null, null);
          
          console.log(arenaMode);
          if (arenaMode === false) {
          
          
          // test whether the player clashes
          clashResult = self.detectClash(direction);
          // see if the user is moving into anything
          if (clashResult === false) {
            // move the player in the desired direction
            self.player.movePlayer(direction);
            // reset the text in the status
            self.statusTextElement.text(defaultStatusText);
          } else {
            // see if there is an clash handling method for this type
            if (clashResult.clashHandler) {
              // call the clash handler method
              clashResult.clashHandler(direction);
            }
          }
          
          
          }
          
          
        }
      }
    });
  }

  // set the self variable equal to this class
  self = this;

}