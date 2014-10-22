// a class file for the map
function Map () {
  
  // this current class
  var self,
  // the default status text
  defaultStatusText = 'Move around and explore with the arrow keys.';
  
  // the width of the map in pixels
  this.mapWidth = 600;
  // the height of the map in pixels
  this.mapHeight = 600;
  // holds the list of trees on the map
  this.trees = [];
  // holds the list of enemies on the map
  this.enemies = [];
  // holds the player''s character
  this.player;
  // holds the map html element
  this.mapElement = $('<div class="map"></div>');
  // holds the status text element
  this.statusTextElement = $('<p class="status"></p>');

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
        // load the trees onto the map
        self.loadTrees(data.trees);
        // load the enemies onto the map
        self.loadEnemies(data.enemies);
        // load the player onto the map
        self.loadPlayer(data.player);
      },
      error    : function (jqXHR, textStatus, errorThrown) {
        console.log('error', jqXHR, textStatus, errorThrown);
      }
    });
  }

  // loads all trees onto the map
  // @param JSON trees The JSON list of trees from file
  this.loadTrees = function (trees) {
    // go through each tree
    $.each(trees, function (index, tree) {
      // create a new Tree object
      var treeObject = new Tree(self);
      // initialize this new Tree object
      treeObject.initialize(tree);
      // add the Tree to the document
      treeObject.addElement(self.mapElement);
      // add this tree object to the array of trees
      self.trees.push(treeObject);
    });
  }

  // loads all enemies onto the map
  // @param JSON enemies The JSON list of enemies from file
  this.loadEnemies = function (enemies) {
    // go through each enemy
    $.each(enemies, function (index, enemy) {
      // create a new Enemy object
      var enemyObject = new Enemy(self);
      // initialize this new Enemy object
      enemyObject.initialize(enemy);
      // add the Enemy to the document
      enemyObject.addElement(self.mapElement);
      // add this enemy object to the array of trees
      self.enemies.push(enemyObject);
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
  
  // detects a clash between the player and any object
  // @param string direction The direction in which the player is trying to move
  // @return boolean Whether the player clashes or not (true = clash)
  this.detectClash = function (direction) {
    // a list of object types to go through
    var objectTypes = ['trees', 'enemies'],
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
    self.statusTextElement.text('Out of bounds.');
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
            clashResult.clashHandler();
          }
        }
      }
    });
  }

  // set the self variable equal to this class
  self = this;

}